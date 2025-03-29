import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nanoid } from "nanoid";
import {
  ExplanationContextHeader,
  RapperHeader,
  TimestampHeader,
  WordPlayHeader,
} from "@/constants";
import { tblWordPlaysInAllThingsBattleRapPH } from "@/db/schema";

type WordPlaysByBattleTableProps = {
  wordPlays: (typeof tblWordPlaysInAllThingsBattleRapPH.$inferSelect)[];
};

export default function WordPlaysByBattleTable({
  wordPlays,
}: WordPlaysByBattleTableProps) {
  const renderRows = () => {
    const rows = wordPlays.map((wordPlay) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell className="whitespace-pre text-balance break-words">
            {wordPlay.wordPlay}
          </TableCell>
          <TableCell>
            <div className="whitespace-pre text-balance break-words">
              {wordPlay.explanationOrContext}
            </div>
          </TableCell>
          <TableCell>{wordPlay.timestamp}</TableCell>
          <TableCell>{wordPlay.rapper}</TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">{WordPlayHeader}</TableHead>
          <TableHead className="w-[40%]">{ExplanationContextHeader}</TableHead>
          <TableHead className="w-[10%]">{TimestampHeader}</TableHead>
          <TableHead className="w-[20%]">{RapperHeader}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
}
