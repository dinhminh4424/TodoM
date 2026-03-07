import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  totalPage,
  page,
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPage <= 4) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (page < 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPage);
      } else if (page > totalPage - 2) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPage);
      }
    }

    return pages;
  };

  const pageToShows = generatePages();
  return (
    <div className="flex justify-center  mt-4">
      <Pagination>
        <PaginationContent>
          {/* trước */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? null : handlePrev}
              className={cn(
                "cursor-pointer",
                page === 1 && "opacity-50 pointer-events-none",
              )}
            />
          </PaginationItem>
          {pageToShows.map((p, index) => {
            return p === "..." ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  className={cn("cursor-pointer")}
                  onClick={() => {
                    if (p !== page) {
                      handlePageChange(p);
                    }
                  }}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* sau */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={page === totalPage ? null : handleNext}
              className={cn(
                "cursor-pointer",
                page === totalPage && "opacity-50 pointer-events-none",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
