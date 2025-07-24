"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import formatDate from "@/utils/formatDate";

function isValidDate(date) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export default function InputDatePicker({ value, onChange, ...props }) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState(value ? new Date(value) : new Date());
  
  const formattedValue = React.useMemo(() => {
    if (!value) return "";
    const date = new Date(value);
    return isValidDate(date) ? formatDate(date) : "";
  }, [value]);

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    const date = new Date(inputVal);
    if (isValidDate(date)) {
      onChange(date);
      setMonth(date);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setInputValue(formatDate(newDate));
    onChange(newDate);
  };

  return (
    <div className="relative flex gap-2">
      <Input
        value={formattedValue}
        className="bg-background pr-10"
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        placeholder="dd/mm/yyyy"
        {...props}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            tabIndex={-1}
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(newDate) => {
              onChange(newDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
