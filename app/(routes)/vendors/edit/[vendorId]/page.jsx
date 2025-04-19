"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Toast from "@/app/(routes)/entries/customer/add/components/Toast";

export default function EditVendor() {
  const router = useRouter();
  const params = useParams();
  const vendorId = params.id;

  const [vendor, setVendor] = useState({
    name: "",
    mobileNumber: "",
    address: "",
  });
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch(`/api/vendors/${vendorId}`);
        if (!res.ok) throw new Error("Failed to fetch vendor data.");
        const data = await res.json();
        setVendor(data);
      } catch (error) {
        setToast({ show: true, message: "Error loading vendor data." });
      }
    };

    if (vendorId) fetchVendor();
  }, [vendorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/vendors/${vendorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendor),
      });

      if (!res.ok) throw new Error("Failed to update vendor.");
      setToast({ show: true, message: "Vendor updated successfully." });

      setTimeout(() => {
        setToast({ show: false, message: "" });
        router.push("/vendors/all");
      }, 2000);
    } catch (err) {
      setToast({ show: true, message: "Error updating vendor." });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Vendor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={vendor.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={vendor.mobileNumber}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={vendor.address}
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
            onClick={() => router.push("/vendors/all")}
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
