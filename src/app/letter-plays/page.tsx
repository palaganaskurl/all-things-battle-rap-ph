import LetterPlaySearch from "@/components/custom/letter-play-search";
import LetterPlayVideoBattleCards from "./video-battle-cards";
import { SkeletonCard } from "@/components/custom/skeleton-card";
import { Suspense } from "react";
import BattleFilters from "@/components/custom/battle-filters";
import { promises as fs } from "fs";

export default async function LetterPlaysPageRoot({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const battleLeaguesFilter = (await searchParams).battleLeagues as string;
  const emceesFilter = (await searchParams).emcees as string;

  const emcees: string[] = JSON.parse(
    await fs.readFile(process.cwd() + "/src/data/emcees.json", "utf8")
  );
  const emceesAsComboBoxItems = emcees.map((emcee) => ({
    label: emcee,
    value: emcee,
  }));

  const battleLeaguesAsComboBoxItems = [
    { label: "FlipTop", value: "FlipTop" },
    { label: "Motus", value: "Motus" },
  ];

  return (
    <div>
      <div>
        <p className="leading-7 not-first:mt-6">
          Collection of anagram, palindromes, and other letter plays in battle
          rap.
        </p>
      </div>
      <LetterPlaySearch query="" />
      <div className="mt-4 flex flex-col gap-4">
        <BattleFilters
          page="letter-plays"
          battleLeaguesAsComboBoxItems={battleLeaguesAsComboBoxItems}
          emceesAsComboBoxItems={emceesAsComboBoxItems}
          defaultBattleLeagues={
            battleLeaguesFilter
              ? battleLeaguesFilter.split(",").map((d) => {
                  return {
                    label: d,
                    value: d,
                  };
                })
              : []
          }
          defaultEmcees={
            emceesFilter
              ? emceesFilter.split(",").map((d) => {
                  return {
                    label: d,
                    value: d,
                  };
                })
              : []
          }
        />
        <Suspense
          key={JSON.stringify({
            battleLeaguesFilter,
            emceesFilter,
          })}
          fallback={
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          }
        >
          <LetterPlayVideoBattleCards
            battleLeaguesFilter={battleLeaguesFilter}
            emceesFilter={emceesFilter}
          />
        </Suspense>
      </div>
    </div>
  );
}
