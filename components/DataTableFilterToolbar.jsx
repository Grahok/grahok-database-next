"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DataTableToolbar({ table }) {
  const globalFilter = table.getState().globalFilter;
  const orderDateColumn = table.getColumn("orderDate");
  const [start, end] = orderDateColumn?.getFilterValue() || [];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 my-4">
      {/* Global Search */}
      <Input
        className="w-full sm:w-60"
        type="search"
        placeholder="Search by name or mobile..."
        value={globalFilter || ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />

      {/* Date Range Filter */}
      {orderDateColumn && (
        <div className="flex gap-2 items-center">
          <Input
            type="date"
            value={start || ""}
            onChange={(e) =>
              orderDateColumn.setFilterValue([e.target.value, end])
            }
          />
          <Input
            type="date"
            value={end || ""}
            onChange={(e) =>
              orderDateColumn.setFilterValue([start, e.target.value])
            }
          />
          <Button
            variant="outline"
            onClick={() => {
              orderDateColumn.setFilterValue(undefined);
              table.setGlobalFilter("");
            }}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
