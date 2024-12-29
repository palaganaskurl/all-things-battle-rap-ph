import { WordPlay } from "@/app/types/wordplay";
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

type WordPlaysTableProps =
  | { isLoading: false; wordPlays: WordPlay[] }
  | { isLoading: true; wordPlays?: never };

export default function WordPlaysTable({
  isLoading,
  wordPlays,
}: WordPlaysTableProps) {
  if (isLoading) {
    return (
      <Table>
        <TableCaption>Curated list from me :D or copyright :D</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Word Play</TableHead>
            <TableHead>Explanation</TableHead>
            <TableHead>Battle Name</TableHead>
            <TableHead>Battle Emcee</TableHead>
            <TableHead>Is Perfect Word Play?</TableHead>
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
    const rows = wordPlays.map((wordPlay) => {
      return (
        <TableRow key={wordPlay.wordPlay}>
          <TableCell>{wordPlay.wordPlay}</TableCell>
          <TableCell>{wordPlay.explanationOrContext}</TableCell>
          <TableCell>{wordPlay.videoName}</TableCell>
          <TableCell>{wordPlay.rapper}</TableCell>
          <TableCell>{wordPlay.isPerfectWordPlay}</TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  return (
    <Table>
      <TableCaption>Curated list from me :D or copyright :D</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Word Play</TableHead>
          <TableHead>Explanation</TableHead>
          <TableHead>Battle Name</TableHead>
          <TableHead>Battle Emcee</TableHead>
          <TableHead>Is Perfect Word Play?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
}
