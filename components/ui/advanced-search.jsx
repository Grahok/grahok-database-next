"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function AdvancedSearch({
  data = [],
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No results found.",
  value,
  disabled = false,
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter(
      (item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [data, searchTerm])

  const handleValueChange = (selectedValue) => {
    if (onValueChange) {
      onValueChange(selectedValue)
    }
    setIsOpen(false)
    setSearchTerm("") // Clear search after selection
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <Select value={value} onValueChange={handleValueChange} disabled={disabled} open={isOpen} onOpenChange={setIsOpen}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="flex items-center px-3 pb-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-8 w-full bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0 px-0"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100">
              ×
            </button>
          )}
        </div>
        <div className="max-h-60 overflow-auto">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
            //   <SelectItem key={`${item.value}-${Math.random()}`} value={item.value}>
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>
          )}
        </div>
      </SelectContent>
    </Select>
  )
}
