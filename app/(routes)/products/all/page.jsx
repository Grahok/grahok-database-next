"use client";

import { Suspense } from "react";
import AllProducts from "./components/AllProducts";

export default function AllCustomerEntriesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllProducts />
    </Suspense>
  );
}
