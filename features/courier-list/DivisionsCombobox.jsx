"use client";

import { UniversalCombobox } from "@/components/ui/combobox";
import { useState } from "react";

export default function DivisionsCombobox({ divisions, onDivisionSelect }) {
  const [selectedDivision, setSelectedDivision] = useState();

  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    onDivisionSelect?.(division);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">Select Division</label>
      <UniversalCombobox
        data={divisions}
        value={selectedDivision}
        onValueChange={handleDivisionChange}
        placeholder="Choose a division..."
        searchPlaceholder="Search divisions..."
        emptyMessage="No divisions found."
        displayValue={(division) => division.label}
        searchValue={(division) => division.label}
      />
    </div>
  );
}
