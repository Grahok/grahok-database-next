"use client";

import createCustomer from "@/features/customers/actions/createCustomer";

export default function AddCustomer() {

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData);

    const response = await createCustomer(customerData);

    if (response.ok) {
      e.target.reset();
      // ✅ Show success toast
      setToast({ show: true, message: "Entry added successfully." });

      setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 2000);
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
        <label htmlFor="name">Customer Name</label>
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
        <label htmlFor="address">Customer Address</label>
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
        Add Customer
      </button>
    </form>
  );
}
