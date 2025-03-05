import LetterPlaysTable from "@/components/custom/letter-plays-table";
import {
  LetterPlays,
  LetterPlaysDatabasePostgreSQL,
} from "@/modules/letter-plays/letter-plays";

export default async function LetterPlaysTableSuspense({
  query,
}: {
  query: string;
}) {
  const letterPlaysController = new LetterPlays(
    new LetterPlaysDatabasePostgreSQL()
  );
  const letterPlays = await letterPlaysController.searchLetterPlays(query);

  return (
    <div>
      <LetterPlaysTable letterPlays={letterPlays} query={query} />
    </div>
  );
}
