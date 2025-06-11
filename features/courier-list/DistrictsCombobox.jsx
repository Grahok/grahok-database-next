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
  );
}
