import { Suspense } from "react";
import WordPlaysByBattleTableSuspense from "./word-plays-by-battle-table-suspense";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ExplanationContextHeader,
  RapperHeader,
  WordPlayHeader,
} from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import TableFooter from "@/components/custom/table-footer";

export default async function WordPlaysByBattlePage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const query = (await params).query.trim();

  return (
    <div>
      <div className="min-h-[calc(100vh-153px)] flex flex-col">
        <Suspense
          fallback={
            <Table>
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
          <WordPlaysByBattleTableSuspense query={query} />
        </Suspense>
      </div>
      <div>
        <TableFooter />
      </div>
    </div>
  );
}
