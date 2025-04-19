"use client";

import { fetchEntries } from "@/app/(routes)/customers/view/[customerId]/actions";
import Toast from "@/app/(routes)/entries/customer/add/components/Toast";
import ConfirmDialog from "@/app/(routes)/entries/customer/add/components/ConfirmDialog";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaPencil, FaPhone, FaTrash } from "react-icons/fa6";

export default function CustomerDeatils({ params }) {
  const { customerId } = React.use(params);
  const [customer, setCustomer] = useState();
  const [toast, setToast] = useState({ show: false, message: "" });
  const [entries, setEntries] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const confirmDialogRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/customers/${customerId}`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch customer data.");
        const { customer } = await response.json();
        setCustomer(customer);
      } catch (error) {
        setToast({ show: true, message: "Error loading customer data." });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchEntries(customerId);
        const { entries } = await response.json();
        setEntries(entries);
      } catch (error) {
        setError("Failed to fetch entries.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function openConfirmDialog(entryId) {
    setSelectedEntryId(entryId); // Store the selected entry ID
    confirmDialogRef.current.open(); // Open the confirmation dialog
  }

  async function handleDelete() {
    try {
      await deleteEntry(selectedEntryId); // Use the stored entry ID
      setEntries((prev) =>
        prev.filter((entry) => entry._id !== selectedEntryId)
      );
      console.log("Entry deleted successfully");
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }
  return (
    <main>
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customer Details</h1>
          <a
            href="/customers/all"
            className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            All Customers
          </a>
        </div>
      </header>
      <main className="grid grid-cols-1 gap-x-16 gap-y-8 p-4 xl:grid-cols-2">
        <section>
          <div>
            <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 p-4 rounded-md mt-4">
              <img
                className="size-16 rounded-full"
                src="/avatar.png"
                alt={customer?.name}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-xl font-semibold">{customer?.name}</h3>
                <a
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2 transition duration-200"
                  href={`tel:${customer?.mobileNumber}`}
                >
                  <FaPhone size={14} />
                  Call
                </a>
              </div>
            </div>

            <table className="w-full mt-4 border-collapse border border-gray-200 [&_th,_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 [&_th]:p-2 [&_td]:p-2 [&_th]:text-left [&_td]:text-left">
              <tbody className="bg-gray-50 [&_tr:nth-child(odd)]:bg-gray-100">
                <tr>
                  <th>Name</th>
                  <td>{customer?.name}</td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{customer?.mobileNumber}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{customer?.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h1 className="text-2xl font-semibold">Previous Orders</h1>
          <table className="w-full mt-4 border-collapse [&_th]:bg-gray-200 border border-gray-200 [&_th,_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 [&_th]:p-2 [&_td]:p-2">
            <thead>
              <tr>
                <th>SL</th>
                <th>Entry Date</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className=" [&_tr:nth-child(even)]:bg-gray-100">
              {entries.length === 0 && !loading && !error && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No entries found.
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="6" className="text-center text-red-500">
                    {error}
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading...
                  </td>
                </tr>
              )}
              {entries.map((entry, index) => (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>
                    {new Date(entry.entryDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    {new Date(entry.orderDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{entry.paidByCustomer}</td>
                  <td>{entry.orderStatus}</td>
                  <td>
                    <div className="flex gap-1">
                      <a
                        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                        href={`/entries/customer/view/${entry._id}`}
                      >
                        <FaEye />
                      </a>
                      <a
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                        href={`/entries/customer/edit/${entry._id}`}
                      >
                        <FaPencil />
                      </a>
                      <button
                        className="p-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition duration-200"
                        onClick={() => openConfirmDialog(entry._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Toast
          show={toast.show}
          message={toast.message}
          onClose={() => setToast({ show: false, message: "" })}
        />
        <ConfirmDialog
          ref={confirmDialogRef}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this entry?"
        />
      </main>
    </main>
  );
}
