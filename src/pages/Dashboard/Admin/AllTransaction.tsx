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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import SeeTransactionDetails from "./SeeTransactionDetails";
import Loading from "@/components/Loading";

const AllTransaction = () => {
  const [limit, setLimit] = useState<number>(10);
  const [paymentValue, setPaymentValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allTransaction, isLoading: allTransactionLoading } =
    useGetAllTransactionQuery({
      tranType: paymentValue,
      page: currentPage,
      limit,
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
  const paymentType = [
    "CASH_IN",
    "SEND_MONEY",
    "CASH_OUT",
    "BONUS",
    "ADD_MONEY",
    "ADD_MONEY_DIGITAL",
    "B2B",
  ];

  const paymentValueChange = (data: string) => {
    setPaymentValue(data);
  };

  const rowOfData = (value: string) => {
    setLimit(Number(value));
  };

  if (allTransactionLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white p-5 md:col-span-3 md:p-10 rounded-4xl">
      <div className=" flex items-center justify-between flex-col md:flex-row">
        <h1 className="text-3xl font-bold text-accent-foreground dark:text-black mb-5">
          Transaction History{" "}
          <sup className="text-blue-800">({allTransaction?.meta?.total})</sup>
        </h1>
        <Select onValueChange={paymentValueChange}>
          <SelectTrigger className="w-full mb-2 md:w-[350px]">
            <SelectValue placeholder="Payment Type Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter Transaction Type</SelectLabel>
              {paymentType.map((item: string) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTransaction?.transaction.map((item: any, idx: number) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="font-medium">{item._id}</TableCell>
                    <TableCell>{item?.send.email}</TableCell>
                    <TableCell>{item?.to.email}</TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell className="text-right">{item?.amount}</TableCell>
                    <TableCell className="text-right">
                      <SeeTransactionDetails tranId={item._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent"></TableRow>
              </TableFooter>
            </Table>
            <div className="mt-5 flex justify-center flex-col md:flex-row gap-y-2">
              <div className="flex items-center">
                <Label className="mr-2">Rows</Label>
                <Select onValueChange={rowOfData}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Number Of Data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Number Of Row</SelectLabel>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
                    {Array.from(
                      { length: totalPage },
                      (_, index) => index + 1
                    ).map((page) => (
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
                    ))}
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
      </div>
    </div>
  );
};

export default AllTransaction;
