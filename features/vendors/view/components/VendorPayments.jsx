"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import AddVendorPaymentForm from "./AddVendorPaymentForm";

export default function VendorPayments({ vendorId }) {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `/api/entries/vendor/byVendor/${vendorId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          }
        );

        const { entries } = await response.json();
        const payments = Array.isArray(entries)
          ? entries.flatMap((entry) =>
              entry.payments.map((payment) => ({
                ...payment,
                invoiceNumber: entry.invoiceNumber,
              }))
            )
          : [];
        setPayments(payments);
      } catch (error) {
        console.error(error);
      }
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
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <AddVendorPaymentForm onSubmit={addNewPayment}>
          Add Payment
        </AddVendorPaymentForm>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center mt-4 border-collapse [&_th]:bg-gray-200 border border-gray-200 [&_th,_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 [&_th]:p-2 [&_td]:p-2">
          <thead>
            <tr>
              <th>SL</th>
              <th>Invoice Number</th>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className=" [&_tr:nth-child(even)]:bg-gray-100">
            {payments?.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.invoiceNumber}</td>
                <td>{formatDate(payment?.paymentDate)}</td>
                <td>{payment.amount}</td>
                <td>
                  <div className="flex gap-1 justify-center">
                    <a
                      className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                      href={`/entries/vendor/edit/${payment._id}`}
                    >
                      <FaPencil />
                    </a>
                    <ConfirmDialog
                      className="p-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition duration-200"
                      message="Do you really want to delete this payment?"
                      label="Delete"
                    >
                      <FaTrash />
                    </ConfirmDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
