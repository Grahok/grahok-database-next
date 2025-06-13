"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
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

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import courierNames from "@/constants/courierNames";
import { useEffect, useState } from "react";
import AdvancedSearch from "@/components/ui/advanced-search";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedUpazilla, setSelectedUpazilla] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({
    division: false,
    district: false,
    upazilla: false,
    // actions: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://bdapi.vercel.app/api/v.1/division",
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const { data } = await response.json();
        const divisions = data.map((datum) => ({
          id: datum.id,
          label: datum.name,
          value: datum.name,
        }));

        setDivisions(divisions);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/district/${selectedDivision?.id}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const { data } = await response.json();
        const districts = data.map((datum) => ({
          id: datum.id,
          label: datum.name,
          value: datum.name,
        }));

        setDistricts(districts);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedDivision]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/upazilla/${selectedDistrict?.id}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const { data } = await response.json();
        const upazillas = data.map((datum) => ({
          id: datum.id,
          label: datum.name,
          value: datum.name,
        }));

        setUpazillas(upazillas);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedDistrict]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _, filterValue) => {
      const search = filterValue.toLowerCase();
      return (
        row.getValue("branchName")?.toLowerCase().includes(search) ||
        row.getValue("location")?.toLowerCase().includes(search)
      );
    },
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-end gap-2">
          <Select
            value={
              table
                .getState()
                .columnFilters.find((filter) => filter.id === "courierName")
                ?.value || ""
            }
            onValueChange={(value) => {
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "courierName"),
                { id: "courierName", value: value },
              ]);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Courier Name" />
            </SelectTrigger>
            <SelectContent>
              {courierNames.map((courier, index) => (
                <SelectItem key={index} value={courier.value}>
                  {courier.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AdvancedSearch
            placeholder="Choose a division..."
            data={divisions}
            value={
              table
                .getState()
                .columnFilters.find((filter) => filter.id === "division")
                ?.value || ""
            }
            onValueChange={(value) => {
              const division = divisions.find(
                (division) => division.value === value
              );
              setSelectedDivision(division);
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "division"),
                { id: "division", value: division.value },
              ]);
            }}
          />
          <AdvancedSearch
            placeholder="Choose a district..."
            data={districts}
            value={
              table
                .getState()
                .columnFilters.find((filter) => filter.id === "district")
                ?.value || ""
            }
            onValueChange={(value) => {
              const district = districts.find(
                (district) => district.value === value
              );
              setSelectedDistrict(district);
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "district"),
                { id: "district", value: district.value },
              ]);
            }}
          />
          <AdvancedSearch
            placeholder="Choose an upazilla..."
            data={upazillas}
            value={
              table
                .getState()
                .columnFilters.find((filter) => filter.id === "upazilla")
                ?.value || ""
            }
            onValueChange={(value) => {
              const upazilla = upazillas.find(
                (upazilla) => upazilla.value === value
              );
              setSelectedUpazilla(upazilla);
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "upazilla"),
                { id: "upazilla", value: upazilla.value },
              ]);
            }}
          />
          <Button
            variant="outline"
            className="group"
            onClick={() => {
              table.resetColumnFilters();
              table.resetGlobalFilter();
            }}
          >
            <RefreshCwIcon className="group-active:animate-spin" />
            Refresh
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search..."
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
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
      </div>
      <div className="rounded-md border">
        <Table>
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
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} Courier Info(s) selected.
        </div>
        {table.getPageCount() > 0 && (
          <>
            {table.getCanPreviousPage() && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.firstPage()}
                >
                  <ChevronsLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    table.setPageIndex(
                      table.getState().pagination.pageIndex - 1
                    )
                  }
                >
                  {table.getState().pagination.pageIndex}
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" disabled>
              {table.getState().pagination.pageIndex + 1}
            </Button>
            {table.getState().pagination.pageIndex <
              table.getPageCount() - 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    table.setPageIndex(
                      table.getState().pagination.pageIndex + 1
                    )
                  }
                >
                  {table.getState().pagination.pageIndex + 2}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRightIcon />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.lastPage()}
                >
                  <ChevronsRightIcon />
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
