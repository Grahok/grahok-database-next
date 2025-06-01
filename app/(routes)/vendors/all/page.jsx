"use client";

import { useEffect, useState } from "react";
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
import fetchVendors from "@/features/vendors/actions/fetchVendors";
import deleteVendor from "@/features/vendors/actions/deleteVendor";
import ConfirmDialog from "@/components/ConfirmDialog";
import { LoaderPinwheel } from "lucide-react";

export default function AllVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchVendors();
        const { vendors } = await response.json();
        setVendors(vendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(vendorId) {
    try {
      await deleteVendor(vendorId);
      setVendors((prev) => prev.filter((vendor) => vendor._id !== vendorId));
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
          {loading && (
            <tr>
              <td colSpan={9} className="bg-gray-50">
                <div className="flex justify-center">
                  <LoaderPinwheel
                    className="animate-spin text-blue-400"
                    size={100}
                  />
                </div>
              </td>
            </tr>
          )}
          {!loading && !vendors.length && (
            <tr>
              <td colSpan={9}>No Vendor Found</td>
            </tr>
          )}
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
                  <ConfirmDialog
                    className="p-1.5 bg-red-600 text-white rounded-md cursor-pointer"
                    onConfirm={() => handleDelete(vendor._id)}
                    message="Are you sure you want to delete this vendor?"
                    label="Delete"
                  >
                    <FaTrash size={12} />
                  </ConfirmDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
