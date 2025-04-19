"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getVendor, updateVendor } from "./actions";

export default function EditVendor({ params }) {
  const router = useRouter();
  const { vendorId } = React.use(params);
  const [vendor, setVendor] = useState();
  useEffect(() => {
    (async () => {
      const response = await getVendor(vendorId);
      try {
        const { vendor } = await response.json();
        setVendor(vendor);
      } catch (error) {
        console.error("Error fetching Vendor", error);
        setError("Error fetching vendor");
      } {/* finally {
        setLoading(false);
      } */}
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const vendorData = Object.fromEntries(formdata);
    try {
      const response = await updateVendor(vendorId, vendorData);
      if (response.ok) {
        router.push("/vendors/all");
      }
    } catch (error) {
      console.log("Error Updating Vendor", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="bg-white p-6 rounded-lg shadow space-y-6"
      aria-labelledby="vendor-section-title"
    >
      <h2 id="vendor-section-title" className="text-2xl font-semibold">
        Edit Vendor
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm">
          Vendor Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={vendor?.name}
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
          defaultValue={vendor?.mobileNumber}
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
          defaultValue={vendor?.address}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Update Vendor
      </button>
      {/* <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      /> */}
    </form>
  );
}
