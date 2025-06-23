"use client";

import AllProducts from "@/features/products/all/components/AllProducts";
import { Suspense } from "react";

export default function AllCustomerEntriesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllProducts />
    </Suspense>
  );
}
