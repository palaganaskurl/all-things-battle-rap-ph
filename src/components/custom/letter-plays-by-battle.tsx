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
import { LetterPlay } from "@/app/types/letter-play";

type LetterPlaysByBattleTableProps =
  | { isLoading: false; letterPlays: LetterPlay[] }
  | { isLoading: true; letterPlays?: never };

export default function LetterPlaysByBattleTable({
  isLoading,
  letterPlays,
}: LetterPlaysByBattleTableProps) {
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
