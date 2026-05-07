"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function DataTableToolbar({
  filters = {},
  isPending = false,
  onApplyFilters,
}) {
  const [search, setSearch] = useState(filters.search || "");
  const [fromDate, setFromDate] = useState(filters.fromDate || "");
  const [toDate, setToDate] = useState(filters.toDate || "");

  useEffect(() => {
    setSearch(filters.search || "");
    setFromDate(filters.fromDate || "");
    setToDate(filters.toDate || "");
  }, [filters.search, filters.fromDate, filters.toDate]);

  function applyFilters(event) {
    event.preventDefault();

    onApplyFilters?.({
      search: search.trim(),
      fromDate,
      toDate,
    });
  }

  function clearFilters() {
    setSearch("");
    setFromDate("");
    setToDate("");

    onApplyFilters?.({
      search: "",
      fromDate: "",
      toDate: "",
    });
  }

  return (
    <form
      className="flex flex-col gap-4 my-4 sm:flex-row sm:items-center"
      onSubmit={applyFilters}
    >
      {/* Global Search */}
      <Input
        className="w-full sm:w-60"
        type="search"
        name="search"
        placeholder="Search name, mobile, address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Date Range Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          type="date"
          name="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <Input
          type="date"
          name="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Apply"}
        </Button>
        <Button type="button" variant="outline" onClick={clearFilters}>
          Clear
        </Button>
      </div>
    </form>
  );
}
