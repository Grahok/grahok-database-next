"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getExpense, updateExpense } from "./actions";
import Toast from "@/components/Toast";
import PAYMENT_METHODS from "@/constants/paymentMethods";
export default function EditExpense({ params }) {
  const router = useRouter();
  const { expenseId } = React.use(params);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [expense, setExpense] = useState();
  useEffect(() => {
    (async () => {
      const response = await getExpense(expenseId);
      try {
        const { expense } = await response.json();
        setExpense(expense);
      } catch (error) {
        console.error("Error fetching Expense", error);
        setError("Error fetching expense");
      }
      {
        /* finally {
        setLoading(false);
      } */
      }
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const expenseData = Object.fromEntries(formdata);
    try {
      const response = await updateExpense(expenseId, expenseData);
      if (response.ok) {
        router.push("/expenses/all");
      }
    } catch (error) {
      console.log("Error Updating Expense", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="bg-white p-6 rounded-lg shadow space-y-6"
      aria-labelledby="expense-section-title"
    >
      <h2 id="expense-section-title" className="text-2xl font-semibold">
        Edit Expense
      </h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm">
          Expense Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={expense?.name}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-sm">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={expense?.amount}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm">
          Date
        </label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={
            expense?.date
              ? new Date(expense.date).toISOString().slice(0, 16)
              : ""
          }
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          type="datetime-local"
          name="paymentMethod"
          id="paymentMethod"
          defaultValue={expense?.paymentMethod}
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        >
          {PAYMENT_METHODS.map((paymentMethod, index) => (
            <option key={index} value={paymentMethod}>
              {paymentMethod}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Update Expense
      </button>
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    </form>
  );
}
