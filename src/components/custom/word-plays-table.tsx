import {
  Table,
  TableBody,
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

type WordPlaysTableProps = {
  wordPlays: (typeof tblWordPlaysInAllThingsBattleRapPH.$inferSelect)[];
  query: string;
};

export default function WordPlaysTable({
  wordPlays,
  query,
}: WordPlaysTableProps) {
  const renderRows = () => {
    const rows = wordPlays.map((wordPlay) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell>
            <Highlighter
              searchWords={[query]}
              autoEscape={true}
              textToHighlight={wordPlay.wordPlay}
              className="whitespace-pre-line text-balance break-words"
            />
          </TableCell>
          <TableCell>
            <div className="whitespace-pre-line text-balance break-words">
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
      <TableHeader>
        <TableRow>
          <TableHead className="w-[15%]">{WordPlayHeader}</TableHead>
          <TableHead className="w-[30%]">{ExplanationContextHeader}</TableHead>
          <TableHead className="w-[25%]">{VideoLinkHeader}</TableHead>
          <TableHead className="w-[10%]">{RapperHeader}</TableHead>
          <TableHead className="w-[10%]">{DateHeader}</TableHead>
        </TableRow>
      </TableHeader>
      {wordPlays && wordPlays.length > 0 ? (
        <TableBody>{renderRows()}</TableBody>
      ) : null}
      {!wordPlays || wordPlays.length === 0 ? (
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
