"use client";

import { useEffect, useState, useRef } from "react";
import {
  FaBullseye,
  FaEye,
  FaHashtag,
  FaLocationDot,
  FaPencil,
  FaPhone,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { fetchCustomers, deleteCustomer } from "./actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/all/components/ConfirmDialog";

export default function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const confirmDialogRef = useRef();

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    loadCustomers();
  }, []);

  function openConfirmDialog(customerId) {
    setSelectedCustomerId(customerId);
    confirmDialogRef.current.open();
  }

  async function handleDelete() {
    try {
      await deleteCustomer(selectedCustomerId);
      setCustomers((prev) =>
        prev.filter((customer) => customer._id !== selectedCustomerId)
      );
      console.log("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-bold">All Customers:</h1>
      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>ID</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaUser />
                <span>Name</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaPhone />
                <span>Mobile Number</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaLocationDot />
                <span>Address</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaBullseye />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.mobileNumber}</td>
              <td>{customer.address}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/customers/view/${customer._id}`}
                    className="p-2 bg-blue-600 text-white rounded-md cursor-pointer"
                  >
                    <FaEye />
                  </a>
                  <a
                    href={`/customers/edit/${customer._id}`}
                    className="p-2 bg-green-600 text-white rounded-md cursor-pointer"
                  >
                    <FaPencil />
                  </a>
                  <button
                    className="p-2 bg-red-600 text-white rounded-md cursor-pointer"
                    onClick={() => openConfirmDialog(customer._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this customer?"
      />
    </div>
  );
}
