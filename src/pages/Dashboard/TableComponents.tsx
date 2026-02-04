/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import { useState } from "react";

export default function TableComponents({
  paymentValue,
}: {
  paymentValue: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const sort = "desc";
  const { data: userData, isLoading: userDataLoading } = useUserGetMeQuery({});
  const { data: myTransaction, isLoading: myTransactionLoading } =
    useGetMyTransactionQuery({
      page: currentPage,
      limit,
      sort,
      tranType: paymentValue,
    });

  const totalPage = myTransaction?.meta?.totalPages;

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

  if (userDataLoading || myTransactionLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="[&>div]:max-h-96">
        <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
            <TableRow className="hover:bg-transparent">
              <TableHead>Serial</TableHead>
              <TableHead>Trans Id</TableHead>
              <TableHead>To/From</TableHead>
              <TableHead>
                {userData?.role === "Agent" ? "Commission" : "Fee/Commission"}
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myTransaction?.transactions.map((item: any, idx: number) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="font-medium">{item._id}</TableCell>
                <TableCell>
                  {item?.to.email === userData?.email
                    ? item?.send?.email
                    : item?.to.email}{" "}
                </TableCell>
                <TableCell>
                  {userData?.role === "Agent"
                    ? item?.commission.toFixed(2)
                    : item?.fee.toFixed(2)}
                </TableCell>
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
                  <PaginationPrevious
                    className="dark:bg-background"
                    onClick={pagePrev}
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      onClick={() => setCurrentPage(page)}
                      key={page}
                    >
                      <PaginationLink
                        className={
                          currentPage !== page
                            ? "dark:bg-foreground dark:text-black"
                            : ""
                        }
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  <PaginationNext
                    className="dark:bg-background"
                    onClick={pageNext}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
