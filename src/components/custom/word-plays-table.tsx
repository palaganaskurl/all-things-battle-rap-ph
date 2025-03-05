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
import Highlighter from "react-highlight-words";
import { nanoid } from "nanoid";
import {
  DateHeader,
  ExplanationContextHeader,
  RapperHeader,
  VideoLinkHeader,
  WordPlayHeader,
} from "@/constants";
import { tblWordPlaysInAllThingsBattleRapPH } from "@/db/schema";

type WordPlaysTableProps =
  | {
      isLoading: false;
      wordPlays: (typeof tblWordPlaysInAllThingsBattleRapPH.$inferSelect)[];
      query: string;
    }
  | { isLoading: true; wordPlays?: never; query?: string };

export default function WordPlaysTable({
  isLoading,
  wordPlays,
  query,
}: WordPlaysTableProps) {
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
            <TableHead className="w-[15%]">{WordPlayHeader}</TableHead>
            <TableHead className="w-[30%]">
              {ExplanationContextHeader}
            </TableHead>
            <TableHead className="w-[25%]">{VideoLinkHeader}</TableHead>
            <TableHead className="w-[10%]">{RapperHeader}</TableHead>
            <TableHead className="w-[10%]">{DateHeader}</TableHead>
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
    const rows = wordPlays.map((wordPlay) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={wordPlay.wordPlay}
            />
          </TableCell>
          <TableCell>
            <div className="whitespace-pre text-balance break-words">
              {wordPlay.explanationOrContext}
            </div>
          </TableCell>
          <TableCell>
            <a
              href={wordPlay.videoURLWithTimestamp}
              target="_blank"
              rel="noreferrer"
              className="no-underline hover:underline"
            >
              {wordPlay.videoName}
            </a>
          </TableCell>
          <TableCell>{wordPlay.rapper}</TableCell>
          <TableCell>{wordPlay.date}</TableCell>
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
          <TableHead className="w-[15%]">{WordPlayHeader}</TableHead>
          <TableHead className="w-[30%]">{ExplanationContextHeader}</TableHead>
          <TableHead className="w-[25%]">{VideoLinkHeader}</TableHead>
          <TableHead className="w-[10%]">{RapperHeader}</TableHead>
          <TableHead className="w-[10%]">{DateHeader}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
}
