"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBullseye,
  FaDollarSign,
  FaEye,
  FaHashtag,
  FaMobile,
  FaPencil,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { fetchEntries, deleteEntry } from "./actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/add/components/ConfirmDialog";

export default function AllEntries() {
  const [entries, setEntries] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const confirmDialogRef = useRef();

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await fetchEntries();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    }

    loadEntries();
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
  const totalProfit = entries.reduce((acc, entry) => {
    return acc + entry.netProfit;
  }, 0);
  const totalDiscount = entries.reduce((acc, entry) => {
    return acc + entry.totalDiscount;
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
      <h1 className="text-3xl font-bold">All Entries:</h1>
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
                <FaBullseye />
                <span>Actions</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaUser />
                <span>Customer</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaMobile />
                <span>Mobile Number</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Purchase Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Sell Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>Total Quantity</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Discount</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Profit</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/entries/view/${entry._id}`}
                    className="p-1.5 bg-blue-600 text-white rounded-md"
                  >
                    <FaEye size={12} />
                  </a>
                  <a
                    href={`/entries/edit/${entry._id}`}
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
              <td>{entry.customer?.name}</td>
              <td>{entry.customer?.mobileNumber}</td>
              <td>{entry.totalPurchasePrice}</td>
              <td>{entry.totalSellPrice}</td>
              <td>{entry.totalQuantity}</td>
              <td>{entry.totalDiscount}</td>
              <td>{entry.netProfit}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="font-bold">
              Total:
            </td>
            <td>{totalPurchasePrice}</td>
            <td>{totalSellPrice}</td>
            <td>{totalQuantity}</td>
            <td>{totalDiscount}</td>
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
