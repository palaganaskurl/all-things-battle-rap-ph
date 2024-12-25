import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WordPlaySearch from "@/components/custom/word-play-search";
import { Suspense } from "react";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/wordplays/wordplays";
import WordPlaysTable from "@/components/custom/word-plays-table";

export default async function WordPlaysPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const wordPlaysController = new WordPlays(new WordPlaysDatabasePostgreSQL());
  const wordPlays = await wordPlaysController.searchWordPlays(
    (
      await params
    ).query
  );

  return (
    <div>
      <div>
        <div>
          <WordPlaySearch />
          <Suspense fallback={<div>Loading</div>}>
            <WordPlaysTable isLoading={false} wordPlays={wordPlays} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
