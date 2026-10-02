"use client";

import Toast from "@/components/Toast";
import { useState } from "react";

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const vendorData = Object.fromEntries(formData);

  const response = await fetch("/api/vendors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vendorData),
  });

  if (response.ok) {
    e.target.reset();
  }
}
export default function AddVendor() {
  const [toast, setToast] = useState({ show: false, message: "" });

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="bg-white p-6 rounded-lg shadow space-y-6"
      aria-labelledby="vendor-section-title"
    >
      <h2 id="vendor-section-title" className="text-2xl font-semibold">
        Add Vendor
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name">Vendor Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          type="text"
          name="mobileNumber"
          id="mobileNumber"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address">Vendor Address</label>
        <input
          type="text"
          name="address"
          id="address"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Add Vendor
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
