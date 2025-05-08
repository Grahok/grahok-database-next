"use client";

import { useEffect, useRef, useState } from "react";
import { FaPencil, FaRotateRight, FaTrash } from "react-icons/fa6";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import formatDate from "@/utils/formatDate";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ConfirmDialog from "@/components/ConfirmDialog";
import getExpenses from "@/features/expenses/actions/getExpenses";
import deleteExpense from "@/features/expenses/actions/deleteExpense";
import Toast from "@/components/Toast";
import EXPENSE_CATEGORIES from "@/constants/expenseCategories";

export default function AllExpenses() {
  const router = useRouter();
  const pathname = usePathname();
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedExpenseId, setSelectedExpenseId] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const confirmDialogRef = useRef();
  const searchParams = useSearchParams();
  const fromDateParam = searchParams.get("fromDate") || "";
  const toDateParam = searchParams.get("toDate") || "";
  const pageParam = Number(searchParams.get("page")) || 1;
  const itemsPerPageParam = Number(searchParams.get("itemsPerPage")) || 20;
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageParam);
  const nameParam = searchParams.get("name") || "";
  const [name, setName] = useState(nameParam);
  const [isSpinning, setIsSpinning] = useState(false);
  const query = new URLSearchParams(
    searchParams.toString() || `itemsPerPage=${itemsPerPage}`
  );
  const queryParams = `?${query}`;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        console.log(queryParams);
        const response = await getExpenses(query);
        const { expenses, pagination } = await response.json();
        const { totalExpenses, totalPages } = pagination;
        setTotalExpenses(totalExpenses);
        setTotalPages(totalPages);
        setExpenses(expenses);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  function openConfirmDialog(expenseId) {
    setSelectedExpenseId(expenseId);
    confirmDialogRef.current.open();
  }

  async function handleDelete() {
    try {
      await deleteExpense(selectedExpenseId);
      setToast({ show: true, message: "Expense Deleted Successfully" });
      setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          show: false,
        }));
      }, 2000);
      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== selectedExpenseId)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  const totalAmount = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-3xl font-bold">All Expenses:</h1>
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
              <a href="/expenses/all" className="p-1.5 bg-orange-300 rounded">
                <FaRotateRight
                  className={`${isSpinning && "animate-spin"} size-5`}
                  onClick={() => setIsSpinning(true)}
                />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <select
                name="name"
                id="name"
                className="p-2 border rounded text-center"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  router.push(
                    `${pathname}?${new URLSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      name: e.target.value,
                      page: 1,
                    }).toString()}`,
                    { shallow: true }
                  );
                }}
              >
                <option value="">All</option>
                {EXPENSE_CATEGORIES.map((expenseCategory, index) => (
                  <option key={index} value={expenseCategory}>
                    {expenseCategory}
                  </option>
                ))}
              </select>
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
                  router.push(
                    `${pathname}?${new URLSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      itemsPerPage: value,
                      page: 1,
                    }).toString()}`,
                    { shallow: true }
                  );
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
        <table className="table-auto w-full [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center max-w-full">
          <thead>
            <tr className="*:sticky *:top-0 *:bg-gray-200">
              <th>ID</th>
              <th>Actions</th>
              <th>Date</th>
              <th>Name</th>
              <th>Payment Method</th>
              <th>Note</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            )}
            {!loading && !expenses.length && (
              <tr>
                <td colSpan={7}>No Expenses Found</td>
              </tr>
            )}
            {expenses.map((expense, index) => (
              <tr key={expense._id} className="hover:bg-gray-100">
                <td>{(pageParam - 1) * itemsPerPageParam + (index + 1)}</td>
                <td>
                  <div className="flex gap-1">
                    <a
                      href={`/expenses/edit/${expense._id}`}
                      className="p-1.5 bg-green-600 text-white rounded-md"
                    >
                      <FaPencil size={12} />
                    </a>
                    <button
                      className="p-1.5 bg-red-600 text-white rounded-md cursor-pointer"
                      onClick={() => openConfirmDialog(expense._id)}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </td>
                <td>{formatDate(expense?.date)}</td>
                <td>{expense.name || "Not Found"}</td>
                <td>{expense.paymentMethod || "Not Found"}</td>
                <td>{expense.note || "N/A"}</td>
                <td>{expense.amount || "Not Found"}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={6} className="font-bold">
                Total:
              </td>
              <th>{totalAmount}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <strong>{`Showing ${Math.min(
          totalExpenses,
          itemsPerPageParam
        )} items of ${totalExpenses || "Loading..."}`}</strong>
        <div className="flex gap-2 leading-none">
          {!pageParam === 1 && (
            <>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
                onClick={() => {
                  query.set("page", 1);
                  router.push(`${pathname}?${query.toString()}`);
                }}
              >
                <LuChevronsLeft />
              </button>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
                onClick={() => {
                  query.set("page", Math.max(1, pageParam - 1));
                  router.push(`${pathname}?${query.toString()}`);
                }}
              >
                <LuChevronLeft />
              </button>
            </>
          )}

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
                  query.set("page", page);
                  router.push(`${pathname}?${query.toString()}`);
                }}
              >
                {page}
              </button>
            ))}
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              query.set("page", pageParam + 1);
              router.push(`${pathname}?${query.toString()}`);
            }}
          >
            <LuChevronRight />
          </button>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              query.set("page", totalPages);
              router.push(`${pathname}?${query.toString()}`);
            }}
          >
            <LuChevronsRight />
          </button>
        </div>
      </div>

      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this expense?"
      />
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={toast.onClose}
      />
    </section>
  );
}
