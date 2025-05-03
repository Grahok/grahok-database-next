"use client";

import { useEffect, useState, useRef } from "react";
import {
  FaBullseye,
  FaCalendar,
  FaEye,
  FaHashtag,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPencil,
  FaPhone,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { getCustomers, deleteCustomer } from "./actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/all/components/ConfirmDialog";
import formatDate from "@/utils/formatDate";

export default function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const confirmDialogRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await getCustomers();
        const { customers } = await response.json();
        setCustomers(customers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false)
      }
    })();
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
      <div className="flex items-center justify-between gap-6">
              <h1 className="text-3xl font-bold">All Customers:</h1>
              <div className="flex items-center gap-3">
              <form className="flex items-center md:items-end gap-6 rounded-lg w-full max-w-2xl border border-gray-400 px-4 py-2">
              <div className="flex items-center gap-2 w-full md:w-1/2">
                <label
                  htmlFor="fromDate"
                  className="font-medium text-gray-700 mb-1"
                >
                  From:
                </label>
                <input
                  className="p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="date"
                  name="fromDate"
                  id="fromDate"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-1/2">
                <label
                  htmlFor="toDate"
                  className="font-medium text-gray-700 mb-1"
                >
                  To:
                </label>
                <input
                  className="p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="date"
                  name="toDate"
                  id="toDate"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-md transition w-full md:w-auto"
              >
                Search
              </button>
            </form>
                <div className="w-full flex items-center gap-2 border focus-within:ring-1 rounded overflow-clip p-1.5 border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
                  <input
                    type="search"
                    name="search-bar"
                    id="search-bar"
                    className="px-2 focus:outline-0"
                    placeholder="Search..."
                  />
                  <button type="submit" className="cursor-pointer bg-blue-600 text-white p-2 rounded-l">
                    <FaMagnifyingGlass />
                  </button>
                </div>
                <div>
                  <select name="itemsPerPage" id="itemsPerPage" className="p-2 border rounded text-center">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            </div>
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
                <FaCalendar />
                <span>Entry Date</span>
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
          {loading && (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
          {!loading && !customers.length && (
            <tr>
              <td colSpan={6}>No Customer Found</td>
            </tr>
          )}
          {customers.map((customer, index) => (
            <tr key={customer._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{formatDate(customer.entryDate)}</td>
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
