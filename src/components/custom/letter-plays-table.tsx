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
import {
  AnagramPalindromeHeader,
  DateHeader,
  ExplanationContextHeader,
  RapperHeader,
  VideoLinkHeader,
} from "@/constants";
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
            <TableHead className="w-15">{AnagramPalindromeHeader}</TableHead>
            <TableHead className="w-30">{ExplanationContextHeader}</TableHead>
            <TableHead className="w-25">{VideoLinkHeader}</TableHead>
            <TableHead className="w-10">{RapperHeader}</TableHead>
            <TableHead className="w-10">{DateHeader}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-100 h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-100 h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-100 h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-100 h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-100 h-[20px] rounded-full" />
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
            <div className="whitespace-pre text-balance break-words">
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
          <TableHead className="w-15">{AnagramPalindromeHeader}</TableHead>
          <TableHead className="w-30">{ExplanationContextHeader}</TableHead>
          <TableHead className="w-25">{VideoLinkHeader}</TableHead>
          <TableHead className="w-10">{RapperHeader}</TableHead>
          <TableHead className="w-10">{DateHeader}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
}
