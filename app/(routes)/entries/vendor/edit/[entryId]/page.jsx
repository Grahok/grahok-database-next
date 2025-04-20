"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/(routes)/entries/customer/add/components/Toast";

export default function EditEntry({ params }) {
  const router = useRouter();
  const { entryId } = React.use(params);

  // Initialize state with default values to avoid uncontrolled inputs
  const [entry, setEntry] = useState({
    customer: { name: "" }, // Default nested object for customer
    totalPurchasePrice: "",
    totalSellPrice: "",
    totalQuantity: "",
    totalDiscount: "",
  });
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch(`/api/entries/${entryId}`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch entry data.");
        const data = await res.json();
        setEntry(data);
      } catch (error) {
        setToast({ show: true, message: "Error loading entry data." });
      }
    };

    if (entryId) fetchEntry();
  }, [entryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/entries/${entryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (!res.ok) throw new Error("Failed to update entry.");
      setToast({ show: true, message: "Entry updated successfully." });

      setTimeout(() => {
        setToast({ show: false, message: "" });
        router.push("/entries/all");
      }, 2000);
    } catch (err) {
      setToast({ show: true, message: "Error updating entry." });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="customer"
            value={entry.customer?.name || ""}
            onChange={(e) =>
              setEntry((prev) => ({
                ...prev,
                customer: { ...prev.customer, name: e.target.value },
              }))
            }
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total Purchase Price</label>
          <input
            type="number"
            name="totalPurchasePrice"
            value={entry.totalPurchasePrice || ""}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total Sell Price</label>
          <input
            type="number"
            name="totalSellPrice"
            value={entry.totalSellPrice || 0}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total Quantity</label>
          <input
            type="number"
            name="totalQuantity"
            value={entry.totalQuantity || 0}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total Discount</label>
          <input
            type="number"
            name="totalDiscount"
            value={entry.totalDiscount || 0}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => router.push("/entries/all")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>

      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}
