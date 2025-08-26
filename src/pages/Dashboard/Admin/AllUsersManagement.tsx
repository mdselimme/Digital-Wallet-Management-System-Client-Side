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
import { Button } from "@/components/ui/button";

const AllUsersManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;
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

  return (
    <div className="bg-white p-5 md:col-span-3 md:p-10 rounded-4xl">
      <h1 className="text-3xl font-bold text-accent-foreground mb-5">
        All Users
      </h1>
      <div>
        <div className="w-full">
          <div className="[&>div]:max-h-[60vh]">
            <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
              <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Serial</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers?.users.map((item: any, idx: number) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.phone}</TableCell>
                    <TableCell>{item?.userStatus}</TableCell>
                    <TableCell>{item?.isActive}</TableCell>
                    <TableCell className="text-green-800 font-bold">
                      {item?.isVerified ? "Verified" : "Not Verified"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button>See Details</Button>
                    </TableCell>
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

export default AllUsersManagement;
