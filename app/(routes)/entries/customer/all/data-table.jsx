"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DataTablePagination from "@/components/DataTablePagination";
import rowsPerPageArray from "@/constants/rowsPerPageArray";
import { getColumns } from "./columns";
import DataTableToolbar from "@/components/DataTableFilterToolbar";

function getUrl(pathname, searchParams) {
  const queryString = searchParams.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function DataTable({ data, pagination, filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Table state
  const [columnVisibility, setColumnVisibility] = useState({
    address: false,
    entryDate: false,
    totalPurchasePrice: false,
    paidByCustomer: false,
    totalDiscount: false,
    shippingMerchant: false,
    otherCost: false,
    courierTax: false,
    netProfit: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const paginationState = useMemo(
    () => ({
      pageIndex: Math.max((pagination?.page || 1) - 1, 0),
      pageSize: pagination?.itemsPerPage || 20,
    }),
    [pagination?.page, pagination?.itemsPerPage],
  );

  function updateQuery(updates) {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        nextSearchParams.delete(key);
        return;
      }

      nextSearchParams.set(key, String(value));
    });

    startTransition(() => {
      router.push(getUrl(pathname, nextSearchParams), { scroll: false });
    });
  }

  // Table instance
  const table = useReactTable({
    data,
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination?.totalPages || 1,
    rowCount: pagination?.totalEntries || data.length,
    enableSorting: false,
    onPaginationChange: (updater) => {
      const nextPagination =
        typeof updater === "function" ? updater(paginationState) : updater;
      const pageSizeChanged = nextPagination.pageSize !== paginationState.pageSize;

      updateQuery({
        page: pageSizeChanged ? 1 : nextPagination.pageIndex + 1,
        itemsPerPage: nextPagination.pageSize,
      });
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination: paginationState,
      columnVisibility,
      rowSelection,
    },
  });

  // Totals calculation for visible columns and rows (after filtering & pagination)
  const visibleTotals = useMemo(() => {
    // Only sum for visible columns, and only for visible rows (after filtering & pagination)
    const rows = table.getRowModel().rows;
    const totals = {};
    // List of keys to sum, matching column accessorKeys
    const sumKeys = [
      "totalPurchasePrice",
      "totalSellPrice",
      "paidByCustomer",
      "totalQuantity",
      "totalDiscount",
      "shippingCustomer",
      "shippingMerchant",
      "otherCost",
      "courierTax",
      "netProfit",
    ];
    // Only sum for columns that are visible
    sumKeys.forEach((key) => {
      const col = table
        .getAllColumns()
        .find((c) => c.id === key || c.accessorKey === key);
      if (col && col.getIsVisible()) {
        totals[key] = rows.reduce(
          (acc, row) => acc + (row.original[key] || 0),
          0,
        );
      }
    });
    return totals;
  }, [table, table.getRowModel().rows, columnVisibility]);

  // Pass totals to columns
  const columns = useMemo(() => getColumns(visibleTotals), [visibleTotals]);
  table.setOptions((opts) => ({ ...opts, columns }));

  return (
    <div>
      <h1 className="text-3xl font-bold">All Customer Entries:</h1>
      <div className="flex items-center justify-between gap-3">
        <DataTableToolbar
          filters={filters}
          isPending={isPending}
          onApplyFilters={(nextFilters) =>
            updateQuery({ ...nextFilters, page: 1 })
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="bg-muted/50 font-medium">
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      <DataTablePagination table={table} rowsPerPageArray={rowsPerPageArray} />
    </div>
  );
}
