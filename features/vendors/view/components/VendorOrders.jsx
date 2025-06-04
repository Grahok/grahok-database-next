"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import deleteVendorEntry from "@/features/entries/vendor/actions/deleteVendorEntry";
import formatDate from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import AddVendorPaymentForm from "./AddVendorPaymentForm";

export default function VendorOrders({ vendorId }) {
  const [entries, setEntries] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/entries/vendor/byVendor/${vendorId}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      const { entries } = await response.json();
      entries.forEach((entry) => {
        const paidAmount = entry.payments.reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);
        entry.paidAmount = paidAmount;
      });
      setEntries(entries);
    })();
  }, []);

  async function addNewPayment(e) {
    e.preventDefault();
    const { invoiceNumber, ...paymentData } = Object.fromEntries(
      new FormData(e.target)
    );

    await fetch(`/api/entries/vendor`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        invoiceNumber,
        paymentData,
      }),
    });
    setDialogOpen(false);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  return (
    <>
      {entries?.map((entry, index) => (
        <tr key={entry._id}>
          <td>{index + 1}</td>
          <td>{entry.invoiceNumber}</td>
          <td>{formatDate(entry?.orderDate)}</td>
          <td>{formatDate(entry?.entryDate)}</td>
          <td>{entry.totalPayment}</td>
          <td>{entry.paidAmount}</td>
          <td>{entry.totalPayment - entry.paidAmount}</td>
          <td>
            <div className="flex gap-1 justify-center">
              <a
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                href={`/entries/vendor/view/${entry._id}`}
              >
                <FaEye />
              </a>
              <ConfirmDialog
                className="p-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition duration-200"
                message="Do you really want to delete this order?"
                label="Delete"
                onConfirm={() => {
                  deleteVendorEntry(entry._id);
                  setTimeout(() => {
                    router.refresh();
                  }, 1000);
                }}
              >
                <FaTrash />
              </ConfirmDialog>

              <AddVendorPaymentForm entry={entry} onSubmit={addNewPayment}>
                <FaPlus />
              </AddVendorPaymentForm>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
