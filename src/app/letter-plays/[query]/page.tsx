import { Suspense } from "react";
import LetterPlaySearch from "@/components/custom/letter-play-search";
import LetterPlaysTableSuspense from "./letter-plays-table-suspense";
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
import { Skeleton } from "@/components/ui/skeleton";
import TableFooter from "@/components/custom/table-footer";

export default async function LetterPlaysPageWithQuery({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const query = (await params).query.trim();

  return (
    <div className="min-h-[calc(100vh-101px)] flex flex-col">
      <div>
        <LetterPlaySearch query={query} />
        <Suspense
          fallback={
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[15%]">
                    {AnagramPalindromeHeader}
                  </TableHead>
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
          }
        >
          <LetterPlaysTableSuspense query={query} />
        </Suspense>
      </div>
      <TableFooter />
    </div>
  );
}
