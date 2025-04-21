"use client";

import { Suspense } from "react";
import AllCustomerEntries from "./components/AllCustomerEntries";

export default function AllCustomerEntriesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllCustomerEntries />
    </Suspense>
  );
}
