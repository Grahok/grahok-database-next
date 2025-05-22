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
  FaRotateRight,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { getCustomers, deleteCustomer } from "../actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/all/components/ConfirmDialog";
import formatDate from "@/utils/formatDate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import inputDateFormat from "@/utils/inputDateFormat";
import firstDateOfCurrentMonth from "@/utils/firstDateOfCurrentMonth";
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

export default function AllCustomers() {
  const router = useRouter();
  const pathname = usePathname();
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [search, setSearch] = useState("");
  const confirmDialogRef = useRef();
  const searchParams = useSearchParams();
  const fromDateParam =
    searchParams.get("fromDate") ||
    firstDateOfCurrentMonth(new Date(Date.now()));
  const toDateParam =
    searchParams.get("toDate") || inputDateFormat(new Date(Date.now()));
  const pageParam = Number(searchParams.get("page")) || 1;
  const itemsPerPageParam = Number(searchParams.get("itemsPerPage")) || 20;
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageParam);
  const [isSpinning, setIsSpinning] = useState(false);
  const queryObj = new URLSearchParams({
    ...Object.fromEntries(searchParams.entries()),
    fromDate: fromDateParam,
    toDate: toDateParam,
    itemsPerPage: itemsPerPageParam,
    page: pageParam,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getCustomers(`?${queryObj.toString()}`);
        const { customers, pagination } = await response.json();
        const { totalCustomers, totalPages } = pagination;
        setTotalCustomers(totalCustomers);
        setTotalPages(totalPages);
        setCustomers(customers);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

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
        <form className="flex items-center gap-3 flex-wrap justify-end">
          <div className="flex items-center md:items-end gap-6 rounded-lg border border-gray-400 px-4 py-2">
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
                defaultValue={fromDateParam}
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
                defaultValue={toDateParam}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-md transition w-full md:w-auto"
              >
                Submit
              </button>
              <a href="/customers/all" className="p-1.5 bg-orange-300 rounded">
                <FaRotateRight
                  className={`${isSpinning && "animate-spin"} size-5`}
                  onClick={() => setIsSpinning(true)}
                />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full flex items-center gap-2 rounded border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition leading-none">
              <input
                type="search"
                name="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-1.5 focus:outline-none"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
              >
                <FaMagnifyingGlass />
              </button>
            </div>
            <div>
              <select
                name="itemsPerPage"
                id="itemsPerPage"
                className="p-2 border rounded text-center"
                value={itemsPerPage}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setItemsPerPage(value);
                  const newQuery = new URLSearchParams(
                    Object.fromEntries(searchParams.entries())
                  );
                  newQuery.set("itemsPerPage", value);
                  newQuery.set("page", 1);
                  router.push(`${pathname}?${newQuery.toString()}`, {
                    shallow: true,
                  });
                }}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={150}>150</option>
                <option value={200}>200</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div>
        <table className="w-full [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
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
                <td>{(pageParam - 1) * itemsPerPage + (index + 1)}</td>
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
      </div>
      <div className="flex justify-between">
        <strong>{`Showing ${Math.min(
          totalCustomers,
          itemsPerPageParam
        )} items of ${totalCustomers || "Loading..."}`}</strong>
        <div className="flex gap-2 leading-none">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", 1);
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronsLeft />
          </button>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", Math.max(1, pageParam - 1));
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronLeft />
          </button>

          {[
            pageParam - 2,
            pageParam - 1,
            pageParam,
            pageParam + 1,
            pageParam + 2,
          ]
            .filter((page) => page > 0 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                type="button"
                className={`${
                  page === pageParam
                    ? "border-2 border-blue-600"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } p-2 rounded cursor-pointer`}
                onClick={() => {
                  const newQuery = new URLSearchParams(
                    Object.fromEntries(searchParams.entries())
                  );
                  newQuery.set("page", page);
                  router.push(`${pathname}?${newQuery.toString()}`, {
                    shallow: true,
                  });
                }}
              >
                {page}
              </button>
            ))}

          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", Math.min(totalPages, pageParam + 1));
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronRight />
          </button>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", totalPages);
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronsRight />
          </button>
        </div>
      </div>

      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this customer?"
      />
    </div>
  );
}
