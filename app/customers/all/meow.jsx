"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { getCustomers } from "./actions";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  FaEye,
  FaHashtag,
  FaMapLocationDot,
  FaMobile,
  FaPencil,
  FaTrash,
  FaUser,
} from "react-icons/fa6";

export default function AllCustomers() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [toast, setToast] = useState({ show: false, message: "" });

  const dialogRef = useRef(null);
  const [idsToDelete, setIdsToDelete] = useState([]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const openDialog = (ids) => {
    setIdsToDelete(ids);
    dialogRef.current?.showModal();
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch("/api/customers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: idsToDelete }),
      });

      if (res.ok) {
        setData((prev) => prev.filter((c) => !idsToDelete.includes(c._id)));
        setSelectedIds((prev) =>
          prev.filter((id) => !idsToDelete.includes(id))
        );
        showToast(`${idsToDelete.length} customer(s) deleted successfully.`);
      } else {
        showToast("Failed to delete customer(s).");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while deleting.");
    } finally {
      dialogRef.current?.close();
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await getCustomers();
      if (result.success) {
        setData(result.customers);
      } else {
        console.error(result.error);
      }
    };
    fetchCustomers();
  }, []);

  const columnHelper = createColumnHelper();

  const filteredData = useMemo(() => {
    return data.filter((c) =>
      [c.name, c.mobileNumber, c.address]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const allVisibleSelected = paginatedData.every((c) =>
    selectedIds.includes(c._id)
  );

  const handleSelectAllVisible = (checked) => {
    if (checked) {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...paginatedData.map((c) => c._id)]),
      ]);
    } else {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedData.some((c) => c._id === id))
      );
    }
  };

  const columns = [
    columnHelper.display({
      id: "select",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.original._id)}
          onChange={() => toggleSelect(row.original._id)}
        />
      ),
      header: () => (
        <input
          type="checkbox"
          checked={allVisibleSelected && paginatedData.length > 0}
          onChange={(e) => handleSelectAllVisible(e.target.checked)}
        />
      ),
    }),
    columnHelper.display({
      id: "serialNumber",
      cell: (info) => info.row.index + 1 + (currentPage - 1) * itemsPerPage,
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <FaHashtag /> SL
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <FaUser /> Name
        </div>
      ),
    }),
    columnHelper.accessor("mobileNumber", {
      cell: (info) => info.getValue(),
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <FaMobile /> Mobile Number
        </div>
      ),
    }),
    columnHelper.accessor("address", {
      cell: (info) => info.getValue(),
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <FaMapLocationDot /> Address
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 w-full">
      {/* Search & Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name, number, address..."
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/2"
        />
        <select
          className="border border-gray-300 rounded-md p-2 cursor-pointer"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[10, 20, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num} per page
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button className="p-2 bg-blue-600 text-white rounded-md text-sm cursor-pointer">
          <a href="/customers/add">Add New</a>
        </button>
        {selectedIds.length > 0 && (
          <button
            className="p-2 bg-red-600 text-white rounded-md text-sm"
            onClick={() => openDialog(selectedIds)}
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Table */}
      <table className="w-full [&_th,_td]:p-2 [&_th,_td]:border [&_th,_td]:border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  <div className="flex justify-center items-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
              <td>
                <div className="flex gap-2 justify-center">
                  <button className="p-2 bg-blue-800 text-white rounded-md cursor-pointer">
                    <FaEye />
                  </button>
                  <a href={`/customers/edit/${row.original._id}`}>
                    <button className="p-2 bg-green-800 text-white rounded-md cursor-pointer">
                      <FaPencil />
                    </button>
                  </a>
                  <button
                    className="p-2 bg-red-800 text-white rounded-md cursor-pointer"
                    onClick={() => openDialog([row.original._id])}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex justify-between items-center mt-2">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/* todo: Toast Component Problem */}

      {/* Toast
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ show: false, message: "" })}
      /> */}

      {/* Confirmation Dialog */}
      <dialog
        ref={dialogRef}
        className="p-6 rounded-md shadow-lg border max-w-sm w-full"
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete {idsToDelete.length} customer(s)?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => dialogRef.current?.close()}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </dialog>
    </div>
  );
}
