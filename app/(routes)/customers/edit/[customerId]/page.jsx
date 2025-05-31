"use client";

import Toast from "@/components/Toast";
import fetchCustomer from "@/features/customers/actions/fetchCustomer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditCustomer({ params }) {
  const router = useRouter();
  const { customerId } = React.use(params);
  const [customer, setCustomer] = useState();
  const [toast, setToast] = useState({ show: false, message: "" });
  useEffect(() => {
    (async () => {
      const response = await fetchCustomer(customerId);
      try {
        const { customer } = await response.json();
        setCustomer(customer);
      } catch (error) {
        console.error("Error fetching Customer", error);
        setError("Error fetching customer");
      }
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const customerData = Object.fromEntries(formdata);
    try {
      const response = await updateCustomer(customerId, customerData);
      if (response.ok) {
        router.push("/customers/all");
      }
    } catch (error) {
      console.log("Error Updating Customer", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="bg-white p-6 rounded-lg shadow space-y-6"
      aria-labelledby="customer-section-title"
    >
      <h2 id="customer-section-title" className="text-2xl font-semibold">
        Edit Customer
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm">
          Customer Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={customer?.name}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mobileNumber" className="text-sm">
          Mobile Number
        </label>
        <input
          type="text"
          name="mobileNumber"
          id="mobileNumber"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={customer?.mobileNumber}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-sm">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={customer?.address}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Update Customer
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
