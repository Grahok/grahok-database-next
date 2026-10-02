"use client";

import fetchCustomers from "@/features/customers/actions/fetchCustomers";
import useDebounce from "@/hooks/use-debounce";
import inputDateFormat from "@/utils/inputDateFormat";
import { useEffect, useState } from "react";

export default function CustomerForm({ onCustomerChange }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomer, setFilteredCustomer] = useState({});
  const [courierData, setCourierData] = useState({});

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Load customer list
  useEffect(() => {
    (async () => {
      try {
        const customers = await fetchCustomers();
        setCustomers(customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      setMobileNumber(debouncedSearch);
      // Filter customers for dropdown
      setFilteredCustomer(
        customers.find((c) => c.mobileNumber === debouncedSearch)
      );

      console.log(filteredCustomer)
    }
  }, [debouncedSearch, customers]);

  useEffect(() => {
    if (mobileNumber !== "") {
      (async () => {
        const response = await fetch(
          `https://bdcourier.com/api/courier-check`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_BDCOURIER_TOKEN}`,
            },
            body: JSON.stringify({ phone: mobileNumber }),
          }
        );
        let {
          courierData: { summary },
        } = await response.json();

        setCourierData(summary);
      })();
    }
  }, [filteredCustomer]);

  // const handleCustomerSelect = (customer) => {
  //   setSelectedCustomerId(customer._id);
  //   setName(customer.name);
  //   setMobileNumber(customer.mobileNumber);
  //   setAddress(customer.address);
  //   setDropdownOpen(false);
  //   setSearch("");
  // };

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
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            id="mobileNumber"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Mobile Number"
            pattern="^01\d{9}$"
            title="Please enter an 11-digit number starting with 01"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <p hidden={!mobileNumber}>{`Delivered: ${
            courierData.success_parcel || 0
          }, Cancelled: ${courierData.cancelled_parcel || 0}. Success Rate: ${
            courierData.success_ratio || 0
          }%`}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Customer Name"
            defaultValue={filteredCustomer?.name}
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
            defaultValue={filteredCustomer?.address}
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
            defaultValue={inputDateFormat(Date.now())}
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
            defaultValue={inputDateFormat(Date.now())}
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
