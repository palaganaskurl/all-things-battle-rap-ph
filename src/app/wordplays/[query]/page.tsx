import WordPlaySearch from "@/components/custom/word-play-search";
import { Suspense } from "react";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/wordplays/wordplays";
import WordPlaysTable from "@/components/custom/word-plays-table";

export default async function WordPlaysPageWithQuery({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const query = (await params).query.trim();
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.searchWordPlays(query);

  return (
    <div>
      <div>
        <div>
          <WordPlaySearch query={query} />
          <Suspense fallback={<div>Loading</div>}>
            <WordPlaysTable
              isLoading={false}
              wordPlays={wordPlays}
              query={query}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
