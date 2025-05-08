"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaEye,
  FaMagnifyingGlass,
  FaRotateRight,
  FaTrash,
} from "react-icons/fa6";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import { fetchEntries, deleteEntry } from "./actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/all/components/ConfirmDialog";
import formatDate from "@/utils/formatDate";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import firstDateOfCurrentMonth from "@/utils/firstDateOfCurrentMonth";
import inputDateFormat from "@/utils/inputDateFormat";

export default function AllCustomerEntries() {
  const router = useRouter();
  const pathname = usePathname();
  const [entries, setEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedEntryId, setSelectedEntryId] = useState("");
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
        const response = await fetchEntries(`?${queryObj.toString()}`);
        const { entries, pagination } = await response.json();
        const { totalEntries, totalPages } = pagination;
        setTotalEntries(totalEntries);
        setTotalPages(totalPages);
        setEntries(entries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

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
  const totalShippingCustomer = entries.reduce((acc, entry) => {
    return acc + entry.shippingCustomer;
  }, 0);
  const totalShippingMerchant = entries.reduce((acc, entry) => {
    return acc + entry.shippingMerchant;
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
  const totalPaidByCustomer = entries.reduce((acc, entry) => {
    return acc + entry.paidByCustomer;
  }, 0);
  const totalQuantity = entries.reduce((acc, entry) => {
    return acc + entry.totalQuantity;
  }, 0);

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-3xl font-bold">All Customer Entries:</h1>
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
              <a
                href="/entries/customer/all"
                className="p-1.5 bg-orange-300 rounded"
              >
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
                type="button"
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
                  const newQuery = new URLSearchParams(Object.fromEntries(searchParams.entries()));
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
      <div className="overflow-x-auto">
        <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center max-w-full">
          <thead>
            <tr className="*:sticky *:top-0 *:bg-gray-200">
              <th>ID</th>
              <th>Actions</th>
              <th>Order Date</th>
              <th>Customer</th>
              <th>Mobile Number</th>
              <th>Total Purchase Price</th>
              <th>Total Sell Price</th>
              <th>Paid By Customer</th>
              <th>Total Quantity</th>
              <th>Total Discount</th>
              <th>Shipping Customer</th>
              <th>Shipping Merchant</th>
              <th>Other Cost</th>
              <th>Courier Tax</th>
              <th>Total Profit</th>
              <th>Order Status</th>
              <th>CN Number</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={17}>Loading...</td>
              </tr>
            )}
            {!loading && !entries.length && (
              <tr>
                <td colSpan={17}>No Entries Found</td>
              </tr>
            )}
            {entries.map((entry, index) => (
              <tr key={entry._id} className="hover:bg-gray-100">
                <td>{(pageParam - 1) * itemsPerPageParam + (index + 1)}</td>
                <td>
                  <div className="flex gap-1">
                    <a
                      href={`/entries/customer/view/${entry._id}`}
                      className="p-1.5 bg-blue-600 text-white rounded-md"
                    >
                      <FaEye size={12} />
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
                <td>{entry.customer?.name || "Customer Not Found"}</td>
                <td>{entry.customer?.mobileNumber || "Customer Not Found"}</td>
                <td>{entry.totalPurchasePrice}</td>
                <td>{entry.totalSellPrice}</td>
                <td>{entry.paidByCustomer}</td>
                <td>{entry.totalQuantity}</td>
                <td>{entry.totalDiscount}</td>
                <td>{entry.shippingCustomer}</td>
                <td>{entry.shippingMerchant}</td>
                <td>{entry.otherCost}</td>
                <td>{entry.courierTax}</td>
                <td>{entry.netProfit}</td>
                <td>{entry.orderStatus}</td>
                <td>{entry.cnNumber || "N/A"}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="font-bold">
                Total:
              </td>
              <th>{totalPurchasePrice}</th>
              <th>{totalSellPrice}</th>
              <th>{totalPaidByCustomer}</th>
              <th>{totalQuantity}</th>
              <th>{totalDiscount}</th>
              <th>{totalShippingCustomer}</th>
              <th>{totalShippingMerchant}</th>
              <th>{totalOtherCost}</th>
              <th>{totalCourierTax}</th>
              <th>{totalProfit}</th>
              <th>N/A</th>
              <th>N/A</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <strong>{`Showing ${Math.min(
          totalEntries,
          itemsPerPageParam
        )} items of ${totalEntries || "Loading..."}`}</strong>
        <div className="flex gap-2 leading-none">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={(e) => {
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
            onClick={(e) => {
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
                onClick={(e) => {
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
            onClick={(e) => {
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
            onClick={(e) => {
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
        message="Are you sure you want to delete this entry?"
      />
    </section>
  );
}
