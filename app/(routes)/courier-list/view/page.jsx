export const dynamic = "force-dynamic";

import fetchCourierLists from "@/features/courier-list/actions/fetchCourierLists";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ViewCourierInfo() {
  const response = await fetchCourierLists();
  const { courierInfo } = await response.json();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">View Courier Info</h1>
      <DataTable columns={columns} data={courierInfo} />
    </div>
  );
}
