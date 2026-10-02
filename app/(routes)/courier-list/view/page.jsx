export const dynamic = "force-dynamic";

import fetchCourierLists from "@/features/courier-list/actions/fetchCourierLists";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ViewCourierInfo() {
  const response = await fetchCourierLists();
  const {courierInfo: courierList} = await response.json();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">View Courier Info</h1>
      <DataTable columns={columns} data={courierList || []} />
    </section>
  );
}
