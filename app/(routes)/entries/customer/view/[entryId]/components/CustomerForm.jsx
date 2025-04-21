"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { getCustomers } from "@/app/(routes)/customers/all/actions";

export default function CustomerForm({ entry, isEditable, onCustomerChange }) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Customer Name"
            value={entry?.customer?.name || "Customer Not Found"}
            onChange={(e) => setName(e.target.value)}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            id="mobileNumber"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Mobile Number"
            value={entry?.customer?.mobileNumber || "Customer Not Found"}
            onChange={(e) => setMobileNumber(e.target.value)}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Address"
            value={entry?.customer?.address || "Customer Not Found"}
            onChange={(e) => setAddress(e.target.value)}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="orderDate">Order Date</label>
          <input
            id="orderDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Order Date"
            defaultValue={entry?.orderDate}
            required
            disabled={!isEditable}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="entryDate">Entry Date</label>
          <input
            id="entryDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Entry Date"
            defaultValue={entry?.entryDate}
            required
            disabled={!isEditable}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="paymentDate">Payment Date</label>
          <input
            id="paymentDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Payment Date"
            defaultValue={entry?.paymentDate}
            disabled={!isEditable}
          />
        </div>
      </div>
    </section>
  );
}
