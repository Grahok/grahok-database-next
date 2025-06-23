export const dynamic = "force-dynamic";

import fetchProducts from "@/features/products/actions/fetchProducts";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function AllCustomers() {
  const products = await fetchProducts();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">All Products:</h1>
      <DataTable columns={columns} data={products || []} />
    </div>
  );
}
