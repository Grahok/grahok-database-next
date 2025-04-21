"use client";

import { useEffect, useState } from "react";
import { fetchEntries } from "../entries/customer/all/components/actions";

export default function Analytics() {
  const [entries, setEntries] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchEntries();
        const { entries } = await response.json();
        setEntries(entries);
      } catch (error) {
        console.error("❌ Error fetching Entries", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <form className="flex flex-col md:flex-row items-start md:items-end gap-6 rounded-lg w-full max-w-2xl">
        <div className="flex flex-col w-full md:w-1/2">
          <label
            htmlFor="fromDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            From
          </label>
          <input
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="date"
            name="fromDate"
            id="fromDate"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label
            htmlFor="toDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            To
          </label>
          <input
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="date"
            name="toDate"
            id="toDate"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition w-full md:w-auto"
        >
          Search
        </button>
      </form>

      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Sell Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
          {!loading && !entries.length && (
            <tr>
              <td colSpan={6}>No Entries Found</td>
            </tr>
          )}
          {entries?.map((entry, index) => (
            <tr>
              <td>{index}</td>
              <td>{entry.products.name}</td>
              <td>{entry.product.quantity}</td>
              <td>{entry.product.purchasePrice}</td>
              <td>{entry.product.sellPrice}</td>
              <td>{entry.product.purchasePrice - entry.product.sellPrice}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}
