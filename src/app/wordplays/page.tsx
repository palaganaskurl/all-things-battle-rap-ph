import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WordPlaySearch from "@/components/custom/word-play-search";
import { Suspense } from "react";

export default async function WordPlays() {
  await setTimeout(() => {}, 5000);
  const data = await fetch("https://httpbin.org/delay/2");
  const posts = await data.json();

  return (
    <div>
      <div>
        <div>
          <div>
            <WordPlaySearch />
          </div>
          <Suspense fallback={<div>Loading</div>}>
            <div>Loaded </div>
          </Suspense>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
