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
import { fetchVendors, deleteVendor } from "./actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/add/components/ConfirmDialog";

export default function AllVendors() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const confirmDialogRef = useRef();

  useEffect(() => {
    async function loadVendors() {
      try {
        const data = await fetchVendors();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }

    loadVendors();
  }, []);

  function openConfirmDialog(vendorId) {
    setSelectedVendorId(vendorId);
    confirmDialogRef.current.open();
  }

  async function handleDelete() {
    try {
      await deleteVendor(selectedVendorId);
      setVendors((prev) =>
        prev.filter((vendor) => vendor._id !== selectedVendorId)
      );
      console.log("Vendor deleted successfully");
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-bold">All Vendors:</h1>
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
          {vendors.map((vendor, index) => (
            <tr key={vendor._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{vendor.name}</td>
              <td>{vendor.mobileNumber}</td>
              <td>{vendor.address}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/vendors/view/${vendor._id}`}
                    className="p-2 bg-blue-600 text-white rounded-md"
                  >
                    <FaEye />
                  </a>
                  <a
                    href={`/vendors/edit/${vendor._id}`}
                    className="p-2 bg-green-600 text-white rounded-md"
                  >
                    <FaPencil />
                  </a>
                  <button
                    className="p-2 bg-red-600 text-white rounded-md cursor-pointer"
                    onClick={() => openConfirmDialog(vendor._id)}
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
        message="Are you sure you want to delete this vendor?"
      />
    </div>
  );
}
