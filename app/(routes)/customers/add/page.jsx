"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createCustomer from "@/features/customers/actions/createCustomer";
import { toast } from "sonner";

export default function AddCustomer() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData);
    const successs = await createCustomer(customerData);
    if (successs) {
      toast.success("Customer added successfully");
      e.target.reset();
    } else {
      toast.error("Failed to add customer");
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
        Add Customer
      </h2>

      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Customer Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="mobileNumber">Mobile Number</Label>
        <Input
          type="text"
          name="mobileNumber"
          id="mobileNumber"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="address">Customer Address</Label>
        <Input
          type="text"
          name="address"
          id="address"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Add Customer
      </Button>
    </form>
  );
}
