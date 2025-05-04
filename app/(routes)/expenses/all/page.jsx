"use client";

import { Suspense } from "react";
import AllExpenses from "./AllExpenses";

export default function AllCustomerEntriesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllExpenses />
    </Suspense>
  );
}
