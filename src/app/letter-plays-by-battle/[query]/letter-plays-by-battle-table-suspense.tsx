import LetterPlaysByBattleTable from "@/components/custom/letter-plays-by-battle";
import {
  LetterPlays,
  LetterPlaysDatabasePostgreSQL,
} from "@/modules/letter-plays/letter-plays";

export default async function LetterPlaysByBattleTableSuspense({
  query,
}: {
  query: string;
}) {
  const letterPlaysController = new LetterPlays(
    new LetterPlaysDatabasePostgreSQL()
  );
  const letterPlays = await letterPlaysController.getLetterPlaysByVideoID(
    query
  );

  if (letterPlays.length === 0) {
    return (
      <div className="flex items-center justify-center text-lg font-semibold min-h-[calc(100vh-101px)]">
        No Data Found
      </div>
    );
  }

  return (
    <div>
      <div className="pb-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          <a
            href={letterPlays[0].videoURL}
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:underline"
          >
            {letterPlays[0].videoName} | {letterPlays[0].date}
          </a>
        </h2>
      </div>
      <LetterPlaysByBattleTable letterPlays={letterPlays} />
    </div>
  );
}
