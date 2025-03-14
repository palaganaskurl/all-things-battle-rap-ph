import WordPlaySearch from "@/components/custom/word-play-search";
import { Suspense } from "react";
import WordPlaysTableSuspense from "./word-plays-table-suspense";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DateHeader,
  ExplanationContextHeader,
  RapperHeader,
  VideoLinkHeader,
  WordPlayHeader,
} from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import TableFooter from "@/components/custom/table-footer";

export default async function WordPlaysPageWithQuery({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const query = decodeURI((await params).query.trim());
  return (
    <div className="md:min-h-[calc(100vh-101px)] min-h-[calc(100vh-137px)] flex flex-col">
      <div>
        <WordPlaySearch query={query} />
        <Suspense
          fallback={
            <Table>
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
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          }
        >
          <WordPlaysTableSuspense query={query} />
        </Suspense>
      </div>
      <TableFooter />
    </div>
  );
}
