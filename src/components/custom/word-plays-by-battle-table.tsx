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
import {
  ExplanationContextHeader,
  RapperHeader,
  WordPlayHeader,
} from "@/constants";
import { tblWordPlaysInAllThingsBattleRapPH } from "@/db/schema";

type WordPlaysByBattleTableProps =
  | {
      isLoading: false;
      wordPlays: (typeof tblWordPlaysInAllThingsBattleRapPH.$inferSelect)[];
    }
  | { isLoading: true; wordPlays?: never };

export default function WordPlaysByBattleTable({
  isLoading,
  wordPlays,
}: WordPlaysByBattleTableProps) {
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
            <TableHead className="w-[30%]">{WordPlayHeader}</TableHead>
            <TableHead className="w-[50%]">
              {ExplanationContextHeader}
            </TableHead>
            <TableHead className="w-[20%]">{RapperHeader}</TableHead>
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
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  const renderRows = () => {
    const rows = wordPlays.map((wordPlay) => {
      return (
        <TableRow key={nanoid()}>
          <TableCell>{wordPlay.wordPlay}</TableCell>
          <TableCell>
            <div className="whitespace-pre text-balance break-words">
              {wordPlay.explanationOrContext}
            </div>
          </TableCell>
          <TableCell>{wordPlay.rapper}</TableCell>
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
          <TableHead className="w-[30%]">{WordPlayHeader}</TableHead>
          <TableHead className="w-[50%]">{ExplanationContextHeader}</TableHead>
          <TableHead className="w-[20%]">{RapperHeader}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
}
