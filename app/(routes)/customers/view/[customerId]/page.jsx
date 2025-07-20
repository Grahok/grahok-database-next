import { PencilIcon, PhoneIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import fetchCustomer from "@/features/customers/actions/fetchCustomer";
import fetchCustomerEntriesByCustomerId from "@/features/entries/customer/actions/fetchCustomerEntriesByCustomerId";
import PreviousOrders from "./components/PreviousOrders";

export default async function CustomerDeatils({ params }) {
  const { customerId } = await params;

  const customer = await fetchCustomer(customerId);
  const entries = await fetchCustomerEntriesByCustomerId(customerId);
  return (
    <main>
      <h1 className="text-2xl font-bold">Customer Details</h1>
      <main className="grid grid-cols-1 gap-x-16 gap-y-8 p-4 xl:grid-cols-2">
        <section>
          <div>
            <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 p-4 rounded-md mt-4">
              <img
                className="size-16 rounded-full"
                src="/avatar.png"
                alt={customer?.name || "Loading..."}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-xl font-semibold">
                  {customer?.name || "Loading..."}
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 transition duration-200"
                    href={`tel:${customer?.mobileNumber || "Loading..."}`}
                  >
                    <PhoneIcon size={14} />
                    Call
                  </a>
                  <a
                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2 transition duration-200"
                    href={`/customers/edit/${customer?._id}`}
                  >
                    <PencilIcon size={14} />
                    Edit
                  </a>
                </div>
              </div>
            </div>
            <Table className="border">
              <TableBody>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableCell>{customer?.name || "Loading..."}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Mobile Number</TableHead>
                  <TableCell>
                    {customer?.mobileNumber || "Loading..."}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableCell>{customer?.address || "Loading..."}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
        <PreviousOrders entries={entries} />
      </main>
    </main>
  );
}
