"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { getCustomers } from "@/app/(routes)/customers/all/actions";

export default function CustomerForm({ onCustomerChange }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customers, setCustomers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Load customer list
  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await getCustomers();
        const { customers } = await response.json();
        setCustomers(customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    loadCustomers();
  }, []);

  // Filter customers for dropdown
  const filtered = customers.filter((c) =>
    [c.name, c.mobileNumber]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleCustomerSelect = (customer) => {
    setSelectedCustomerId(customer._id);
    setName(customer.name);
    setMobileNumber(customer.mobileNumber);
    setAddress(customer.address);
    setDropdownOpen(false);
    setSearch("");
  };

  useEffect(() => {
    onCustomerChange({
      _id: selectedCustomerId,
      name,
      mobileNumber,
      address,
    });
  }, [name, mobileNumber, address, selectedCustomerId]);

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Customer Info</h2>
      <section className="space-y-10">
        {/* Customer Dropdown */}
        <div className="relative max-w-80">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-controls="customer-dropdown"
            className="w-full px-4 py-2 bg-white border rounded shadow flex justify-between items-center cursor-pointer"
          >
            <span>{name || "Select a Customer"}</span>
            <FaChevronDown />
          </button>

          <div
            id="customer-dropdown"
            className={`absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-64 overflow-y-auto ${
              dropdownOpen ? "" : "hidden"
            }`}
            role="listbox"
          >
            <div className="p-2">
              <input
                type="search"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                aria-label="Search customers"
              />
            </div>

            {filtered.map((customer) => (
              <button
                type="button"
                key={customer._id}
                role="option"
                onClick={() => handleCustomerSelect(customer)}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-200"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{customer.name}</span>
                  <span className="text-xs text-gray-500">
                    {customer.mobileNumber}
                  </span>
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="p-4 text-sm text-gray-500 text-center">
                No customer available
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Customer Name"
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
        <div className="flex flex-col gap-1">
          <label htmlFor="paymentDate">Payment Date</label>
          <input
            id="paymentDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Payment Date"
          />
        </div>
      </div>
    </section>
  );
}
