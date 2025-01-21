import { Suspense } from "react";
import {
  LetterPlays,
  LetterPlaysDatabasePostgreSQL,
} from "@/modules/letter-plays/letter-plays";
import LetterPlaySearch from "@/components/custom/letter-play-search";
import LetterPlaysTable from "@/components/custom/letter-plays-table";

export default async function LetterPlaysPageWithQuery({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const query = (await params).query.trim();
  const letterPlaysController = new LetterPlays(
    new LetterPlaysDatabasePostgreSQL()
  );
  const letterPlays = await letterPlaysController.searchLetterPlays(query);

  return (
    <div>
      <div>
        <div>
          <LetterPlaySearch query={query} />
          <Suspense fallback={<div>Loading</div>}>
            <LetterPlaysTable
              isLoading={false}
              letterPlays={letterPlays}
              query={query}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
