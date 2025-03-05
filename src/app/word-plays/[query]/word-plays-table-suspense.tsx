import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";
import WordPlaysTable from "@/components/custom/word-plays-table";

export default async function WordPlaysTableSuspense({
  query,
}: {
  query: string;
}) {
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.searchWordPlays(query);

  return (
    <div>
      <WordPlaysTable wordPlays={wordPlays} query={query} />
    </div>
  );
}
