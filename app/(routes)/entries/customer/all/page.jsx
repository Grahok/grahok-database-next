"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBullseye,
  FaDollarSign,
  FaEye,
  FaHashtag,
  FaMagnifyingGlass,
  FaMobile,
  FaPencil,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { fetchEntries, deleteEntry } from "./actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/all/components/ConfirmDialog";
import formatDate from "@/utils/formatDate";

export default function AllEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntryId, setSelectedEntryId] = useState("");
  const confirmDialogRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchEntries();
        const { entries } = await response.json();
        setEntries(entries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function openConfirmDialog(entryId) {
    setSelectedEntryId(entryId);
    confirmDialogRef.current.open();
  }

  async function handleDelete() {
    try {
      await deleteEntry(selectedEntryId);
      setEntries((prev) =>
        prev.filter((entry) => entry._id !== selectedEntryId)
      );
      console.log("Entry deleted successfully");
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }
  const totalProfit = entries.reduce((acc, entry) => {
    return acc + entry.netProfit;
  }, 0);
  const totalDiscount = entries.reduce((acc, entry) => {
    return acc + entry.totalDiscount;
  }, 0);
  const totalOtherCost = entries.reduce((acc, entry) => {
    return acc + entry.otherCost;
  }, 0);
  const totalCourierTax = entries.reduce((acc, entry) => {
    return acc + entry.courierTax;
  }, 0);
  const totalPurchasePrice = entries.reduce((acc, entry) => {
    return acc + entry.totalPurchasePrice;
  }, 0);
  const totalSellPrice = entries.reduce((acc, entry) => {
    return acc + entry.totalSellPrice;
  }, 0);
  const totalQuantity = entries.reduce((acc, entry) => {
    return acc + entry.totalQuantity;
  }, 0);

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-3xl font-bold">All Customer Entries:</h1>
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
          <div className="w-full flex items-center gap-2 border focus-within:ring-1 ring-blue-400 rounded overflow-clip">
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
            <select name="showPerPage" id="showPerPage" className="p-2 border rounded text-center">
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
            <th>ID</th>
            <th>Actions</th>
            <th>Order Date</th>
            <th>Customer</th>
            <th>Mobile Number</th>
            <th>Total Purchase Price</th>
            <th>Total Sell Price</th>
            <th>Total Quantity</th>
            <th>Total Discount</th>
            <th>Other Cost</th>
            <th>Courier Tax</th>
            <th>Total Profit</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={12}>Loading...</td>
            </tr>
          )}
          {!loading && !entries.length && (
            <tr>
              <td colSpan={12}>No Entries Found</td>
            </tr>
          )}
          {entries.map((entry, index) => (
            <tr key={entry._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/entries/customer/view/${entry._id}`}
                    className="p-1.5 bg-blue-600 text-white rounded-md"
                  >
                    <FaEye size={12} />
                  </a>
                  <a
                    href={`/entries/customer/edit/${entry._id}`}
                    className="p-1.5 bg-green-600 text-white rounded-md"
                  >
                    <FaPencil size={12} />
                  </a>
                  <button
                    className="p-1.5 bg-red-600 text-white rounded-md cursor-pointer"
                    onClick={() => openConfirmDialog(entry._id)}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </td>
              <td>{formatDate(entry.orderDate)}</td>
              <td>{entry.customer.name}</td>
              <td>{entry.customer.mobileNumber}</td>
              <td>{entry.totalPurchasePrice}</td>
              <td>{entry.totalSellPrice}</td>
              <td>{entry.totalQuantity}</td>
              <td>{entry.totalDiscount}</td>
              <td>{entry.otherCost}</td>
              <td>{entry.courierTax}</td>
              <td>{entry.netProfit}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} className="font-bold">
              Total:
            </td>
            <td>{totalPurchasePrice}</td>
            <td>{totalSellPrice}</td>
            <td>{totalQuantity}</td>
            <td>{totalDiscount}</td>
            <td>{totalOtherCost}</td>
            <td>{totalCourierTax}</td>
            <td>{totalProfit}</td>
          </tr>
        </tbody>
      </table>
      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this entry?"
      />
    </section>
  );
}
