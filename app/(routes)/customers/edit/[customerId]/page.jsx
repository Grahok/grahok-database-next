"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fetchCustomer from "@/features/customers/actions/fetchCustomer";
import updateCustomer from "@/features/customers/actions/updateCustomer";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditCustomer({ params }) {
  const router = useRouter();
  const { customerId } = use(params);
  const [customer, setCustomer] = useState();

  useEffect(() => {
    (async () => {
      const customer = await fetchCustomer(customerId);
      setCustomer(customer);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const customerData = Object.fromEntries(formdata);

    const success = await updateCustomer(customerId, customerData);
    if (success) {
      toast.success(`Customer updated successfully`);
      router.back();
    } else {
      toast.error("Failed to update customer");
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
        <Label htmlFor="name" className="text-sm">
          Customer Name
        </Label>
        <Input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={customer?.name}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="mobileNumber" className="text-sm">
          Mobile Number
        </Label>
        <Input
          type="text"
          name="mobileNumber"
          id="mobileNumber"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={customer?.mobileNumber}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="address" className="text-sm">
          Address
        </Label>
        <Input
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
    </form>
  );
}
