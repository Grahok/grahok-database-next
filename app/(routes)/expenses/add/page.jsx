"use client";

import Toast from "@/components/Toast";
import EXPENSE_CATEGORIES from "@/constants/expenseCategories";
import PAYMENT_METHODS from "@/constants/paymentMethods";
import createExpense from "@/features/expenses/actions/createExpense";
import { useState } from "react";

export default function AddExpense() {
  const [toast, setToast] = useState({ show: false, message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expenseData = Object.fromEntries(formData);

    const response = await createExpense(expenseData);

    if (response.ok) {
      e.target.reset();
      // ✅ Show success toast
      setToast({ show: true, message: "Expense added successfully." });

      setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          show: false,
        }));
      }, 2000);
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
        Add Expense
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name">Expense Name</label>
        <select
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        >
          {EXPENSE_CATEGORIES.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date">Date</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          name="paymentMethod"
          id="paymentMethod"
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

      <div className="flex flex-col gap-1">
        <label htmlFor="note">Note</label>
        <textarea
          name="note"
          id="note"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Add Expense
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
