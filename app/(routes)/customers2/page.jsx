export const dynamic = "force-dynamic";

import fetchCustomers from "@/features/customers/actions/fetchCustomers";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const response = await fetchCustomers();
  const { customers } = await response.json();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">All Customers:</h1>
      <DataTable columns={columns} data={customers} />
    </div>
  );
}
