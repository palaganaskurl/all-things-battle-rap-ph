import { Skeleton } from "@/components/ui/skeleton";
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
  LetterPlayHeader,
} from "@/constants";
import { tblLetterPlaysInAllThingsBattleRapPH } from "@/db/schema";

type LetterPlaysByBattleTableProps = {
  letterPlays: (typeof tblLetterPlaysInAllThingsBattleRapPH.$inferSelect)[];
};

export default function LetterPlaysByBattleTable({
  letterPlays,
}: LetterPlaysByBattleTableProps) {
  const renderRows = () => {
    const rows = letterPlays.map((letterPlay) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell>{letterPlay.letterPlay}</TableCell>
          <TableCell>
            <div className="whitespace-pre text-balance break-words">
              {letterPlay.explanationOrContext}
            </div>
          </TableCell>
          <TableCell>{letterPlay.rapper}</TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">{LetterPlayHeader}</TableHead>
          <TableHead className="w-[50%]">{ExplanationContextHeader}</TableHead>
          <TableHead className="w-[20%]">{RapperHeader}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
}
