"use client";

import AllCustomerEntries from "@/features/entries/customer/all/components/AllCustomerEntries";
import { Suspense } from "react";

export default function AllCustomerEntriesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllCustomerEntries />
    </Suspense>
  );
}
