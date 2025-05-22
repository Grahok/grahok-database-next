"use client";

import { Suspense } from "react";
import AllCustomers from "./components/AllCustomers";

export default function AllCustomerEntriesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllCustomers />
    </Suspense>
  );
}
