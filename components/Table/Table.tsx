"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import "./index.css";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import DebouncedInput from "./components/DebouncedInput";
import dayjs from "dayjs";
// import { Loading } from "../Loading/Loading";

// Table Component
export default function Table({
  data,
  columns,
  isSearchActive = false,
  isFilterYearsActive = false,
}: //   pageCount,
//   pageIndex,
//   setPageIndex,
//   isLoading = false,
{
  data: any;
  columns: ColumnDef<any>[];
  isSearchActive?: boolean;
  isFilterYearsActive?: boolean;
  pageCount?: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
}) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    {
      id: "year",
      value: 0,
    },
  ]);

  const [pagination, setPagination] = useState({
    // pageIndex: pageIndex, //initial page index
    pageSize: 10, //default page size
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    // pageCount: pageCount,
    state: {
      //   pagination,
      columnFilters,
      globalFilter,
    },
    getRowId: (row) => row.id, //required because row indexes will change
    manualPagination: true,
  });

  const generatePageNumbers = useMemo(() => {
    const pages = [];
    const pageCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex;
    const maxPageButtons = 5;

    if (pageCount <= maxPageButtons) {
      // If the total pages are less than or equal to maxPageButtons, show all pages
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else if (pageIndex <= 2) {
      // Show first 3 pages, dots, and last page
      pages.push(0, 1, 2, "...", pageCount - 1);
    } else if (pageIndex >= pageCount - 3) {
      // Show first page, dots, and last 3 pages
      pages.push(0, "...", pageCount - 3, pageCount - 2, pageCount - 1);
    } else {
      // Show first page, dots, current page - 1, current page, current page + 1, dots, and last page
      pages.push(
        0,
        "...",
        pageIndex - 1,
        pageIndex,
        pageIndex + 1,
        "...",
        pageCount - 1
      );
    }

    return pages;
  }, [table.getState().pagination.pageIndex, table.getPageCount()]);

  useEffect(() => {
    if (selectedDate) {
      setColumnFilters([
        {
          id: "year",
          value: dayjs(selectedDate).year(),
        },
      ]);
    } else {
      setColumnFilters([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    // setPageIndex(table.getState().pagination.pageIndex);
  }, [table.getState().pagination.pageIndex]);

  return (
    <div>
      {/* {(isSearchActive || isFilterYearsActive) && (
        <div className="flex border-t px-6 pt-5 pb-2">
          {isFilterYearsActive && (
            <div className="w-[140px]">
              <DatePicker
                wrapperClassName="datePickerWrapper"
                className="datePicker"
                selected={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e);
                }}
                placeholderText="All Year"
                calendarClassName="calendar"
                showYearPicker
                dateFormat="yyyy"
              />
            </div>
          )}
          <div className="flex-grow" />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
        </div>
      )} */}
      <div className="h-4" />
      {false ? (
        <div className="w-full flex items-center justify-center p-8">
          {/* <Loading /> */}
          load data
        </div>
      ) : (
        <div className="relative">
          <table className="w-full ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  style={{
                    height: 50,
                  }}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          padding: "16px 24px",
                          width: header.column.getSize(),
                        }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            {data.length === 0 ? (
              <tbody className="">
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      padding: "36px 24px",
                      textAlign: "center",
                    }}>
                    <Image
                      alt=""
                      src={"/empty-table.svg"}
                      width={120}
                      height={120}
                      className="mx-auto"
                    />
                    <div className="text-lg text-gray-80 font-semibold">
                      Data Not Entered Yet
                    </div>
                    <div className="text-sm text-gray-60">
                      You havent entered data for this menu yet. Please add data
                      first to complete the available table.
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map((row, idx) => {
                  return (
                    <tr key={idx}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            style={{
                              width: cell.column.getSize(),
                              padding: "16px 24px",
                            }}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          {/* pagination */}
          <div className="flex">
            <div className="flex-grow" />
            <div className="mx-6 my-5 flex gap-x-0.5	">
              <div
                className={clsx(
                  "px-2 py-1 rounded flex items-center justify-center cursor-pointer",
                  !table.getCanPreviousPage()
                    ? "bg-gray-30"
                    : "bg-gray-30 hover:bg-gray-50"
                )}
                onClick={() => {
                  if (table.getCanPreviousPage()) {
                    table.setPageIndex(
                      table.getState().pagination.pageIndex - 1
                    );
                  }
                }}>
                <Image
                  src="/chevron-left.svg"
                  alt="pagination back button"
                  width={16}
                  height={16}
                />
              </div>
              {/* loop shit */}
              {generatePageNumbers.map((page, index) => (
                <div key={index}>
                  {typeof page === "string" ? (
                    <div
                      className={clsx(
                        "min-w-7 px-2 py-1 rounded bg-gray-30 hover:bg-gray-50 cursor-pointer"
                      )}>
                      ...
                    </div>
                  ) : (
                    <button
                      className={clsx(
                        "min-w-7 px-2 py-1 rounded cursor-pointer",
                        table.getState().pagination.pageIndex === page
                          ? "bg-primary-60 text-gray-10"
                          : "bg-gray-30 hover:bg-gray-50"
                      )}
                      onClick={() => table.setPageIndex(page)}
                      disabled={table.getState().pagination.pageIndex === page}>
                      {page + 1}
                    </button>
                  )}
                </div>
              ))}

              <div
                className={clsx(
                  "px-2 py-1 rounded flex items-center justify-center cursor-pointer",
                  !table.getCanNextPage()
                    ? "bg-gray-30"
                    : "bg-gray-30 hover:bg-gray-50 "
                )}
                onClick={() => {
                  if (table.getCanNextPage()) {
                    table.setPageIndex(
                      table.getState().pagination.pageIndex + 1
                    );
                  }
                }}>
                <Image
                  src="/chevron-right.svg"
                  alt="pagination back button"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
