"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fetchCustomers from "@/features/customers/actions/fetchCustomers";
import useDebounce from "@/hooks/use-debounce";
import inputDateFormat from "@/utils/inputDateFormat";
import { useEffect, useState } from "react";

export default function CustomerForm({ filteredCustomer, setFilteredCustomer }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [customers, setCustomers] = useState([]);
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
      }
    })();
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      setMobileNumber(search);
      // Filter customers for dropdown
      setFilteredCustomer(
        customers.find((c) => c.mobileNumber === debouncedSearch)
      );
    }
  }, [debouncedSearch]);

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

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Customer Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            type="text"
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
          <Label htmlFor="name">Customer Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Customer Name"
            defaultValue={filteredCustomer?.name}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Address"
            defaultValue={filteredCustomer?.address}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="orderDate">Order Date</Label>
          <Input
            id="orderDate"
            name="orderDate"
            type="date"
            placeholder="Order Date"
            defaultValue={inputDateFormat(Date.now())}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="entryDate">Entry Date</Label>
          <Input
            id="entryDate"
            name="entryDate"
            type="date"
            placeholder="Entry Date"
            defaultValue={inputDateFormat(Date.now())}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="paymentDate">Payment Date</Label>
          <Input
            id="paymentDate"
            name="paymentDate"
            type="date"
            placeholder="Payment Date"
          />
        </div>
      </div>
    </section>
  );
}
