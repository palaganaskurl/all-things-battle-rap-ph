import { Suspense } from "react";
import {
  LetterPlays,
  LetterPlaysDatabasePostgreSQL,
} from "@/modules/letter-plays/letter-plays";
import LetterPlaysByBattleTable from "@/components/custom/letter-plays-by-battle";

export default async function LetterPlaysByBattlePage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const query = (await params).query.trim();
  const letterPlaysController = new LetterPlays(
    new LetterPlaysDatabasePostgreSQL()
  );
  const letterPlays = await letterPlaysController.getWordPlaysByVideoID(query);

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
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
        <LetterPlaysByBattleTable isLoading={false} letterPlays={letterPlays} />
      </Suspense>
    </div>
  );
}
