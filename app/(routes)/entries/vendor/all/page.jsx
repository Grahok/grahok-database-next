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
import ConfirmDialog from "@/app/(routes)/entries/vendor/all/components/ConfirmDialog";

export default function AllVendorEntries() {
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

  const totalDiscount = entries.reduce((acc, entry) => {
    return acc + entry.totalDiscount;
  }, 0);
  const totalPurchasePrice = entries.reduce((acc, entry) => {
    return acc + entry.totalPurchasePrice;
  }, 0);
  const totalQuantity = entries.reduce((acc, entry) => {
    return acc + entry.totalQuantity;
  }, 0);

  return (
    <section className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-bold">All Vendor Entries:</h1>
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
                <span>Vendor</span>
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
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          )}
          {!loading && !entries.length && (
            <tr>
              <td colSpan={7}>No Entries Found</td>
            </tr>
          )}
          {entries.map((entry, index) => (
            <tr key={entry._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/entries/vendor/view/${entry._id}`}
                    className="p-1.5 bg-blue-600 text-white rounded-md"
                  >
                    <FaEye size={12} />
                  </a>
                  <a
                    href={`/entries/vendor/edit/${entry._id}`}
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
              <td>{entry.vendor.name}</td>
              <td>{entry.vendor.mobileNumber}</td>
              <td>{entry.totalPurchasePrice}</td>
              <td>{entry.totalQuantity}</td>
              <td>{entry.totalDiscount}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="font-bold">
              Total:
            </td>
            <td>{totalPurchasePrice}</td>
            <td>{totalQuantity}</td>
            <td>{totalDiscount}</td>
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
