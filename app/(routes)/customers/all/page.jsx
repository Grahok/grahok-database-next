"use client";

import AllCustomers from "@/features/customers/all/components/AllCustomers";
import { Suspense } from "react";

export default function AllCustomerEntriesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllCustomers />
    </Suspense>
  );
}
