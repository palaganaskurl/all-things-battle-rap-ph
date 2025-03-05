import {
  Table,
  TableBody,
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
import { tblLetterPlaysInAllThingsBattleRapPH } from "@/db/schema";

type LetterPlaysTableProps = {
  letterPlays: (typeof tblLetterPlaysInAllThingsBattleRapPH.$inferSelect)[];
  query: string;
};

export default function LetterPlaysTable({
  letterPlays,
  query,
}: LetterPlaysTableProps) {
  const renderRows = () => {
    const rows = letterPlays.map((letterPlay) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={letterPlay.letterPlay}
              className="whitespace-pre-line text-balance break-words"
            />
          </TableCell>
          <TableCell>
            <div className="whitespace-pre-line text-balance break-words">
              {letterPlay.explanationOrContext}
            </div>
          </TableCell>
          <TableCell>
            <a
              href={letterPlay.videoURLWithTimestamp}
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
      <TableHeader>
        <TableRow>
          <TableHead className="w-[15%]">{AnagramPalindromeHeader}</TableHead>
          <TableHead className="w-[30%]">{ExplanationContextHeader}</TableHead>
          <TableHead className="w-[25%]">{VideoLinkHeader}</TableHead>
          <TableHead className="w-[10%]">{RapperHeader}</TableHead>
          <TableHead className="w-[10%]">{DateHeader}</TableHead>
        </TableRow>
      </TableHeader>
      {letterPlays && letterPlays.length > 0 ? (
        <TableBody>{renderRows()}</TableBody>
      ) : null}
      {!letterPlays || letterPlays.length === 0 ? (
        <TableBody>
          <TableRow>
            <TableCell className="text-center" colSpan={5}>
              <p className="text-sm text-muted-foreground my-4">
                No data found
              </p>
            </TableCell>
          </TableRow>
        </TableBody>
      ) : null}
    </Table>
  );
}
