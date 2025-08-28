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
import { useState } from "react";
import { useUserGetAllQuery } from "@/redux/features/user/user.api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import SeeAccountDetails from "./SeeAccountDetails";

const AllUsersManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const { data: allUsers } = useUserGetAllQuery({
    page: currentPage,
    limit,
  });

  console.log(allUsers);

  const totalPage = allUsers?.meta?.totalPages;

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

  const rowOfData = (value: string) => {
    setLimit(Number(value));
  };

  return (
    <div className="bg-white p-5 md:col-span-3 md:p-10 rounded-4xl">
      <h1 className="text-3xl font-bold text-accent-foreground dark:text-black mb-5">
        All Users{" "}
        <span className="text-green-600">({allUsers?.meta?.total})</span>
      </h1>
      <div className="w-full">
        <div className="w-full">
          <div className="[&>div]:max-h-[60vh]">
            <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
              <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Serial</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers?.data.map((item: any, idx: number) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.phone}</TableCell>

                    <TableCell className="text-right">
                      <SeeAccountDetails userId={item?._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent"></TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
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
};

export default AllUsersManagement;
