/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useState } from "react";

const AllTransaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const sort = "desc";

  const { data: allTransaction } = useGetAllTransactionQuery({
    page: currentPage,
    limit,
    sort,
  });

  const totalPage = allTransaction?.meta?.totalPages;

  const pagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const pageNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white p-5 md:col-span-3 md:p-10 rounded-4xl">
      <h1 className="text-3xl font-bold text-accent-foreground mb-5">
        Transaction History{" "}
        <sup className="text-blue-800">({allTransaction?.meta?.total})</sup>
      </h1>
      <div>
        <div className="w-full">
          <div className="[&>div]:max-h-[60vh]">
            <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
              <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Serial</TableHead>
                  <TableHead>Trans Id</TableHead>
                  <TableHead>Send</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTransaction?.transaction.map((item: any, idx: number) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="font-medium">{item._id}</TableCell>
                    <TableCell>{item?.send.email}</TableCell>
                    <TableCell>{item?.to.email}</TableCell>
                    <TableCell>{item?.fee.toFixed(2)}</TableCell>
                    <TableCell>{item?.commission.toFixed(2)}</TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell className="text-right">{item?.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent"></TableRow>
              </TableFooter>
            </Table>
            <div className="mt-5">
              {totalPage > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    >
                      <PaginationPrevious onClick={pagePrev} />
                    </PaginationItem>
                    {Array.from(
                      { length: totalPage },
                      (_, index) => index + 1
                    ).map((page) => (
                      <PaginationItem
                        onClick={() => setCurrentPage(page)}
                        key={page}
                      >
                        <PaginationLink isActive={currentPage === page}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      className={
                        currentPage === totalPage
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    >
                      <PaginationNext onClick={pageNext} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTransaction;
