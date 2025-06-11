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
} from "lucide-react";
import { useRouter } from "next/navigation";
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

export function DataTable({ columns, data }) {
  const router = useRouter();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
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
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-end gap-2">
          <Select
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
          <input
            type="hidden"
            name="division"
            value={selectedDivision.value || ""}
          />
          <AdvancedSearch
            placeholder="Choose a district..."
            data={districts}
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
          <input
            type="hidden"
            name="district"
            value={selectedDistrict.value || ""}
          />
          <AdvancedSearch
            placeholder="Choose an upazilla..."
            data={upazillas}
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
          <input
            type="hidden"
            name="upazilla"
            value={selectedUpazilla.value || ""}
          />
          <div className="flex gap-3">
            <Button type="submit">Submit</Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="group"
            onClick={() => router.refresh()}
          >
            <RefreshCwIcon className="group-active:animate-spin" />
            Refresh
          </Button>
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
