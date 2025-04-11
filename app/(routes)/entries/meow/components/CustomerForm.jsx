"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function CustomerForm({
  customers,
  customer,
  setCustomer,
  orderDate,
  setOrderDate,
  entryDate,
  setEntryDate,
  paymentDate,
  setPaymentDate,
}) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter customers for dropdown
  const filteredCustomers = customers.filter(
    (anotherCustomer) =>
      anotherCustomer._id !== customer?._id &&
      [anotherCustomer.name, anotherCustomer.mobileNumber]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()) // Match search query
  );

  function handleCustomerSelect(selectedCustomer) {
    setCustomer(selectedCustomer);
    setSearch("");
    setDropdownOpen(false);
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      {/* Customer Dropdown */}
      <header className="relative w-80">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full px-4 py-2 bg-white border rounded shadow flex justify-between items-center cursor-pointer"
        >
          <span>{customer?.name || "Select a Customer"}</span>
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
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>

          {filteredCustomers.map((customer) => (
            <button
              key={customer._id}
              type="button"
              onClick={() => handleCustomerSelect(customer)}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-200"
              role="option"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{customer.name}</span>
                <span className="text-xs text-gray-500">
                  {customer.mobileNumber}
                </span>
              </div>
            </button>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="p-4 text-sm text-gray-500 text-center">
              No customer available
            </div>
          )}
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-gray-500">
            Customer Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Customer Name"
            value={customer?.name || ""}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="mobileNumber" className="text-sm text-gray-500">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="text"
            placeholder="Mobile Number"
            value={customer?.mobileNumber || ""}
            onChange={(e) =>
              setCustomer({ ...customer, mobileNumber: e.target.value })
            }
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="customerAddress" className="text-sm text-gray-500">
            Address
          </label>
          <input
            id="customerAddress"
            type="text"
            placeholder="Customer Address"
            value={customer?.address || ""}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="orderDate" className="text-sm text-gray-500">
            Order Date
          </label>
          <input
            id="orderDate"
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="entryDate" className="text-sm text-gray-500">
            Entry Date
          </label>
          <input
            id="entryDate"
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="paymentDate" className="text-sm text-gray-500">
            Payment Date
          </label>
          <input
            id="paymentDate"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>
      </section>
    </section>
  );
}
