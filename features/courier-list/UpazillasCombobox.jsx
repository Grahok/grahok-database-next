"use client";

import { UniversalCombobox } from "@/components/ui/combobox";
import { useState } from "react";

export default function UpazillasCombobox({ upazillas, onUpazillaSelect }) {
  const [selectedUpazilla, setSelectedUpazilla] = useState();

  const handleUpazillaChange = (upazilla) => {
    setSelectedUpazilla(upazilla);
    onUpazillaSelect?.(upazilla);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">Select Upazilla</label>
      <UniversalCombobox
        data={upazillas}
        value={selectedUpazilla}
        onValueChange={handleUpazillaChange}
        placeholder="Choose an upazilla..."
        searchPlaceholder="Search upazillas..."
        emptyMessage="No upazillas found."
        displayValue={(upazilla) => upazilla.label}
        searchValue={(upazilla) => upazilla.label}
      />
    </div>
  );
}
