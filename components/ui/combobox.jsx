"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function UniversalCombobox({
  data,
  value,
  onValueChange,
  placeholder = "Select item...",
  searchPlaceholder = "Search item...",
  emptyMessage = "No items found.",
  displayValue,
  searchValue,
  disabled = false,
  className,
}) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  // Use searchValue function if provided, otherwise fall back to displayValue
  const getSearchableText = searchValue || displayValue

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data
    return data.filter((item) => getSearchableText(item).toLowerCase().includes(searchTerm.toLowerCase()))
  }, [data, searchTerm, getSearchableText])

  const handleSelect = (selectedItem) => {
    const newValue = value === selectedItem ? undefined : selectedItem
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} className="flex flex-col gap-2">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
          disabled={disabled}
        >
          {value ? displayValue(value) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} value={searchTerm} onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item, index) => (
                <CommandItem key={index} value={getSearchableText(item)} onSelect={() => handleSelect(item)}>
                  <Check className={cn("mr-2 h-4 w-4", value === item ? "opacity-100" : "opacity-0")} />
                  {displayValue(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
