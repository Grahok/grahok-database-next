"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { fetchVendors } from "@/app/(routes)/vendors/all/actions";

export default function VendorForm({ onVendorChange }) {
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [vendors, setVendors] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Load vendor list
  useEffect(() => {
    async function loadVendors() {
      try {
        const response = await fetchVendors();
        const { vendors } = await response.json();
        setVendors(vendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }

    loadVendors();
  }, []);

  // Filter vendors for dropdown
  const filtered = vendors.filter((c) =>
    [c.name, c.mobileNumber]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleVendorSelect = (vendor) => {
    setSelectedVendorId(vendor._id);
    setName(vendor.name);
    setMobileNumber(vendor.mobileNumber);
    setAddress(vendor.address);
    setDropdownOpen(false);
    setSearch("");
  };

  useEffect(() => {
    onVendorChange({
      _id: selectedVendorId,
      name,
      mobileNumber,
      address,
    });
  }, [name, mobileNumber, address, selectedVendorId]);

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Vendor Info</h2>
      <section className="space-y-10">
        {/* Vendor Dropdown */}
        <div className="relative max-w-80">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-controls="vendor-dropdown"
            className="w-full px-4 py-2 bg-white border rounded shadow flex justify-between items-center cursor-pointer"
          >
            <span>{name || "Select a Vendor"}</span>
            <FaChevronDown />
          </button>

          <div
            id="vendor-dropdown"
            className={`absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-64 overflow-y-auto ${
              dropdownOpen ? "" : "hidden"
            }`}
            role="listbox"
          >
            <div className="p-2">
              <input
                type="text"
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                aria-label="Search vendors"
              />
            </div>

            {filtered.map((vendor) => (
              <button
                type="button"
                key={vendor._id}
                role="option"
                onClick={() => handleVendorSelect(vendor)}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-200"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{vendor.name}</span>
                  <span className="text-xs text-gray-500">
                    {vendor.mobileNumber}
                  </span>
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="p-4 text-sm text-gray-500 text-center">
                No vendor available
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="vendorName">Vendor Name</label>
          <input
            id="vendorName"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Vendor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            id="mobileNumber"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="orderDate">Order Date</label>
          <input
            id="orderDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Order Date"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="entryDate">Entry Date</label>
          <input
            id="entryDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Entry Date"
            defaultValue={new Date(Date.now()).toISOString().split("T")[0]}
            required
          />
        </div>
      </div>
    </section>
  );
}
