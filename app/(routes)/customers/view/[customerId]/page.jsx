"use client";

import React, { useEffect, useState } from "react";
import fetchCustomerEntriesByCustomerId from "@/features/entries/customer/actions/fetchCustomerEntryByCustomerId";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  EyeIcon,
  Loader2Icon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import formatDate from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import deleteCustomerEntry from "@/features/entries/customer/actions/deleteCustomerEntry";

export default function CustomerDeatils({ params }) {
  const { customerId } = React.use(params);
  const [customer, setCustomer] = useState();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        cache: "no-store",
      });
      if (response.ok) {
        const { customer } = await response.json();
        setCustomer(customer);
      } else {
        toast.error("Error loading customer data.");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchCustomerEntriesByCustomerId(customerId);
        const { entries } = await response.json();
        setEntries(entries);
      } catch (_) {
        setError("Failed to fetch entries.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(entryId) {
    try {
      await deleteCustomerEntry(entryId); // Use the stored entry ID
      setEntries((prev) => prev.filter((entry) => entry._id !== entryId));
      console.log("Entry deleted successfully");
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }
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
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Previous Orders</h1>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Entry Date</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Courier Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:nth-child(even)]:bg-gray-100">
              {entries.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No entries found.
                  </TableCell>
                </TableRow>
              )}
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="bg-gray-50">
                    <div className="flex justify-center">
                      <Loader2Icon
                        className="animate-spin text-blue-400"
                        size={50}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {entries.map((entry, index) => (
                <TableRow key={entry._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{formatDate(entry.entryDate)}</TableCell>
                  <TableCell>{formatDate(entry.orderDate)}</TableCell>
                  <TableCell>{entry.paidByCustomer}</TableCell>
                  <TableCell>{entry.orderStatus}</TableCell>
                  <TableCell>{entry.shippingMethod}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button
                        className="bg-blue-600 hover:bg-blue-600/90 cursor-pointer size-7"
                        asChild
                      >
                        <Link href={`/entries/customer/view/${entry._id}`}>
                          <EyeIcon />
                        </Link>
                      </Button>
                      <ConfirmDialog
                        className="p-1.5 bg-red-600 text-white rounded-md cursor-pointer"
                        onConfirm={() => handleDelete(entry._id)}
                        message="Are you sure you want to delete this entry?"
                        label="Delete"
                      >
                        <TrashIcon size={12} />
                      </ConfirmDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    </main>
  );
}
