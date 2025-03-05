import WordPlaysByBattleTable from "@/components/custom/word-plays-by-battle-table";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";

export default async function WordPlaysByBattleTableSuspense({
  query,
}: {
  query: string;
}) {
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.getWordPlaysByVideoID(query);

  if (wordPlays.length === 0) {
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
            href={wordPlays[0].videoURL}
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:underline"
          >
            {wordPlays[0].videoName} | {wordPlays[0].date}
          </a>
        </h2>
      </div>
      <WordPlaysByBattleTable wordPlays={wordPlays} />
    </div>
  );
}
