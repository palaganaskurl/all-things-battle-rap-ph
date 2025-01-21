import { LetterPlay } from "@/app/types/letter-play";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nanoid } from "nanoid";
import Highlighter from "react-highlight-words";

type LetterPlaysTableProps =
  | { isLoading: false; letterPlays: LetterPlay[]; query: string }
  | { isLoading: true; letterPlays?: never; query?: string };

export default function LetterPlaysTable({
  isLoading,
  letterPlays,
  query,
}: LetterPlaysTableProps) {
  const TableCaptionComponent = () => (
    <TableCaption>
      All content on this website is curated and owned by{" "}
      <a href="https://github.com/palaganaskurl">
        https://github.com/palaganaskurl
      </a>
      . All rights reserved.
    </TableCaption>
  );

  if (isLoading) {
    return (
      <Table>
        {TableCaptionComponent()}
        <TableHeader>
          <TableRow>
            <TableHead>Anagram / Palindrome</TableHead>
            <TableHead>Explanation / Context</TableHead>
            <TableHead>Battle Name</TableHead>
            <TableHead>Battle Emcee</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  const renderRows = () => {
    const rows = letterPlays.map((letterPlay) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={letterPlay.letterPlay}
            />
          </TableCell>
          <TableCell>
            <div className="whitespace-pre ">
              {letterPlay.explanationOrContext}
            </div>
          </TableCell>
          <TableCell>
            <a
              href={letterPlay.videoURL}
              target="_blank"
              rel="noreferrer"
              className="no-underline hover:underline"
            >
              {letterPlay.videoName}
            </a>
          </TableCell>
          <TableCell>{letterPlay.rapper}</TableCell>
          <TableCell>{letterPlay.date}</TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  return (
    <Table>
      {TableCaptionComponent()}
      <TableHeader>
        <TableRow>
          <TableHead>Word Play</TableHead>
          <TableHead>Explanation</TableHead>
          <TableHead>Battle Name</TableHead>
          <TableHead>Battle Emcee</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
}
