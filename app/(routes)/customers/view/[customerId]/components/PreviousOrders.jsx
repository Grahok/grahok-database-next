"use client"

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import deleteCustomerEntry from "@/features/entries/customer/actions/deleteCustomerEntry";
import formatDate from "@/utils/formatDate";
import { EyeIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function PreviousOrders({ entries }) {
  async function handleDelete(entryId) {
    const { success } = await deleteCustomerEntry(entryId);
    if (success) {
      toast.warning("Entry deleted successfully");
    } else {
      toast.error("Failed to delete entry");
    }
  }
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Previous Orders</h1>
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
  );
}
