"use client";

import { UniversalCombobox } from "@/components/ui/combobox";
import { useState } from "react";

export default function DistrictsCombobox({ districts, onDistrictSelect }) {
  const [selectedDistrict, setSelectedDistrict] = useState();

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    onDistrictSelect?.(district);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">Select District</label>
      <UniversalCombobox
        data={districts}
        value={selectedDistrict}
        onValueChange={handleDistrictChange}
        placeholder="Choose a district..."
        searchPlaceholder="Search districts..."
        emptyMessage="No districts found."
        displayValue={(district) => district.label}
        searchValue={(district) => district.label}
      />
    </div>
  );
}
