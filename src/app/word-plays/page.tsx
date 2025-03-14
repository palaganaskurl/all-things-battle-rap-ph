import WordPlaySearch from "@/components/custom/word-play-search";
import BattleFilters from "@/components/custom/battle-filters";
import { Suspense } from "react";
import WordPlayVideoBattleCards from "./video-battle-cards";
import { SkeletonCard } from "@/components/custom/skeleton-card";
import emcees from "@/data/emcees";
import BattlesPagination from "@/components/custom/battles-pagination";
import { BattlesPerPage } from "@/constants";

export default async function WordPlaysPageRoot({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const battleLeaguesFilter = (await searchParams).battleLeagues as string;
  const emceesFilter = (await searchParams).emcees as string;
  const currentPage = parseInt((await searchParams).page as string) || 1;

  const emceesAsComboBoxItems = emcees.wordPlayEmcees.map((emcee) => ({
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
          Collection of double entendres, syllable plays, homophones, webbings,
          puns, name plays, and other word plays in battle rap.
        </p>
      </div>
      <WordPlaySearch query="" />
      <div className="mt-4 flex flex-col gap-4">
        <BattleFilters
          page="word-plays"
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
            currentPage,
          })}
          fallback={
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          }
        >
          <WordPlayVideoBattleCards
            battleLeaguesFilter={battleLeaguesFilter}
            emceesFilter={emceesFilter}
            currentPage={currentPage}
            perPage={BattlesPerPage}
          />
          <BattlesPagination
            urlPrefix="/word-plays"
            currentPage={currentPage}
            emceesFilter={emceesFilter}
            battleLeaguesFilter={battleLeaguesFilter}
          />
        </Suspense>
      </div>
    </div>
  );
}
