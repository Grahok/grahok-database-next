import { columns } from "./columns";
import { DataTable } from "./data-table";
import baseUrl from "@/constants/baseUrl";

export default async function DemoPage() {
  const response = await fetch(`${baseUrl}/api/customers`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const { customers } = await response.json();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">All Customers:</h1>
      <DataTable columns={columns} data={customers} />
    </div>
  );
}
