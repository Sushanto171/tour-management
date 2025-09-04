import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import type { Dispatch } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "./ui/select";

interface IProps {
  totalPages: number;
  onChange: Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  total: number;
  limit: number;
  onLimitChange: Dispatch<React.SetStateAction<number>>;
}

function getLimitOptions(totalData: number): number[] {
  const baseOptions = [5, 10, 20, 50, 100, 200, 300, 500];
  const options = baseOptions.filter((val) => val < totalData);
  if (!options.includes(totalData)) {
    options.push(totalData);
  }
  return options;
}

export default function Paginate({
  totalPages,
  currentPage,
  onChange,
  limit,
  onLimitChange,
  total,
}: IProps) {
  const maxVisible = 5;
  let pages: (number | string)[] = [];

  if (totalPages <= maxVisible) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    pages.push(1);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  const limitOptions = getLimitOptions(total);

  return (
    <div className="my-6 flex items-center justify-center gap-2">
      <div>
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onChange((pre) => Math.max(1, pre - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {pages.map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    className={`cursor-pointer ${
                      currentPage === page ? "border border-muted" : ""
                    }`}
                    onClick={() => onChange(page as number)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => onChange((pre) => Math.min(totalPages, pre + 1))}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div>
        <Select
          onValueChange={(value) => onLimitChange(Number(value))}
          value={limit?.toString()}
        >
          <SelectTrigger className=" rounded-lg px-2 py-1 border border-muted-foreground cursor-pointer ">
            <SelectValue placeholder="limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Limit</SelectLabel>
              {limitOptions.map((limit) => (
                <SelectItem key={limit} value={limit?.toString()}>
                  {limit}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
