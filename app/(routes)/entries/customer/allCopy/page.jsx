export const dynamic = "force-dynamic";

import fetchCustomerEntries from "@/features/entries/customer/actions/fetchCustomerEntries";
import { DataTable } from "./data-table";

export default async function AllCustomers() {
  const customerEntries = (await fetchCustomerEntries()) || [];

  return (
    <div className="container mx-auto py-10">
      <DataTable data={customerEntries} />
    </div>
  );
}
