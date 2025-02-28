import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface QueryTableProps {
  tableData: Record<string, string | number>[];
  tableHeaders: string[];
  totalAmount?: number;
}

export function QueryTable({
  tableData,
  tableHeaders,
  totalAmount,
}: QueryTableProps) {
  const customizedTableData = tableData.map((tableValues) => {
    if (tableHeaders.includes("Amount")) {
      return {
        ...tableValues,
        Amount: `KES ${tableValues["Amount"].toLocaleString()}`,
      };
    } else return { ...tableValues };
  });

  return (
    <Table className="max-h-40">
      <TableCaption>A list of your recent data.</TableCaption>
      <TableHeader className="hover:text-white">
        <TableRow className="hover:text-white">
          {tableHeaders.map((header, idx) => (
            <TableHead
              key={idx}
              className={`w-[100px] ${
                header == "Amount" ? "text-right" : "w-48"
              }`}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-40">
        {customizedTableData.map((tableValues, idx) => (
          <TableRow key={idx}>
            {tableHeaders.map((header, idx2) => (
              <TableCell
                key={`${idx}${idx2}`}
                className={`${header == "Amount" ? "text-right" : ""}`}
              >
                {(tableValues as Record<string, string | number>)[header]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {totalAmount &&(
            <TableRow>
              <TableCell colSpan={tableHeaders.length-1}>Total</TableCell>
              <TableCell className="text-right">
                KES {totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          )}
      </TableFooter>
    </Table>
  );
}
