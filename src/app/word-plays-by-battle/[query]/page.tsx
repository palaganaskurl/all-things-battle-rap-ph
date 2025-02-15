import { Suspense } from "react";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";
import WordPlaysByBattleTable from "@/components/custom/word-plays-by-battle-table";

export default async function WordPlaysByBattlePage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const query = (await params).query.trim();
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.getWordPlaysByVideoID(query);

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
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
        <WordPlaysByBattleTable isLoading={false} wordPlays={wordPlays} />
      </Suspense>
    </div>
  );
}
