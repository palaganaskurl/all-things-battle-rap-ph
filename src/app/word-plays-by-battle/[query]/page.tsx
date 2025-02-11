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
        <div>
          <a
            href={wordPlays[0].videoURL}
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:underline"
          >
            {wordPlays[0].videoName} | {wordPlays[0].date}
          </a>
        </div>
        <WordPlaysByBattleTable isLoading={false} wordPlays={wordPlays} />
      </Suspense>
    </div>
  );
}
