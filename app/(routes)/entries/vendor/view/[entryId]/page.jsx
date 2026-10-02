"use client";

import { FaArrowLeft, FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import inputDateFormat from "@/utils/inputDateFormat";
import fetchVendorEntry from "@/features/entries/vendor/actions/fetchVendorEntry";
import React, { useEffect, useState } from "react";
import formatDate from "@/utils/formatDate";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ViewEntry({ params }) {
  const { entryId } = React.use(params);
  const [entry, setEntry] = useState();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchVendorEntry(entryId);
        const { entry } = await response.json();
        entry.orderDate = inputDateFormat(entry.orderDate);
        entry.entryDate = inputDateFormat(entry.entryDate);
        setEntry(entry);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800 flex flex-col gap-8">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">View Entry</h1>
          <button
            type="button"
            onClick={() => setIsEditable((prev) => !prev)}
            className="p-2 bg-green-600 text-white rounded-md cursor-pointer"
          >
            <FaPencil />
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Invoice Number"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-right w-24 disabled:bg-gray-100 disabled:cursor-not-allowed"
            defaultValue={entry?.invoiceNumber}
            disabled={!isEditable}
          />
        </div>
      </header>

      <main className="space-y-10">
        {/* Vendor Section */}
        <section className="bg-white p-6 rounded-lg shadow space-y-6">
          <h2 className="text-2xl font-semibold">Vendor Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="vendorName">Vendor Name</label>
              <input
                id="vendorName"
                type="text"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 cursor-not-allowed"
                placeholder="Vendor Name"
                defaultValue={entry?.vendor.name || ""}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                id="mobileNumber"
                type="text"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 cursor-not-allowed"
                placeholder="Mobile Number"
                defaultValue={entry?.vendor.mobileNumber || ""}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 cursor-not-allowed"
                placeholder="Address"
                defaultValue={entry?.vendor.address || ""}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="orderDate">Order Date</label>
              <input
                id="orderDate"
                type="date"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Order Date"
                defaultValue={entry?.orderDate || ""}
                disabled={!isEditable}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="entryDate">Entry Date</label>
              <input
                id="entryDate"
                type="date"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Entry Date"
                defaultValue={entry?.entryDate || ""}
                disabled={!isEditable}
              />
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section className="bg-white p-6 rounded-lg shadow space-y-6">
          <h2 className="text-2xl font-semibold">Products</h2>

          {/* Product Table */}
          <table className="w-full table-auto border-spacing-4 border [&_th,_td]:border [&_th,_td]:border-gray-300 [&_th,_td]:p-2 [&_th]:bg-gray-200">
            <thead>
              <tr className="text-left">
                <th>Name</th>
                <th>Quantity</th>
                <th>In Stock</th>
                <th>Purchase Price</th>
                <th>Discount</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {entry?.products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td>{product?.product.name}</td>
                  <td>{product?.quantity}</td>
                  <td>{product?.product.inStock}</td>
                  <td>{product?.purchasePrice}</td>
                  <td>{product?.discount}</td>
                  <td>{product?.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Summary */}
        <section className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping & Options */}
          <div className="space-y-4">
            <div>
              <label className="text-sm">Shipping Charge (Merchant)</label>
              <input
                type="number"
                className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                defaultValue={entry?.shippingCharge}
                disabled={!isEditable}
              />
            </div>
            <div>
              <label className="text-sm">Shipping Method</label>
              <select
                className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!isEditable}
              >
                {["Pathao", "Steadfast", "Sunderban", "Korotoa", "Janani"].map(
                  (opt, index) => (
                    <option key={index} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="text-sm">Other Cost</label>
              <input
                type="number"
                placeholder={0}
                defaultValue={entry?.otherCost}
                className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!isEditable}
              />
            </div>
            <div>
              <label className="text-sm">Note</label>
              <textarea
                name="note"
                id="note"
                defaultValue={entry?.note}
                className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!isEditable}
              ></textarea>
            </div>
          </div>

          {/* Summary Table */}
          <div>
            <table className="w-full table-auto border-spacing-y-4 border-separate">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>{entry?.subtotal}</td>
                </tr>
                <tr>
                  <td>Paid by Merchant</td>
                  <td>{entry?.paidByMerchant}</td>
                </tr>
                <tr>
                  <td>Shipping Charge</td>
                  <td>{entry?.shippingCharge}</td>
                </tr>
                <tr>
                  <td>Total Payment</td>
                  <td>{entry?.totalPayment}</td>
                </tr>
                <tr>
                  <td>Courier Tax</td>
                  <td>
                    <input
                      type="number"
                      placeholder={0}
                      min={0}
                      defaultValue={entry?.courierTax}
                      className="w-24 p-1 border rounded text-right disabled:bg-gray-100 disabled:cursor-not-allowed"
                      disabled={!isEditable}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Overall Discount</td>
                  <td>
                    <input
                      type="number"
                      placeholder={0}
                      className="w-24 p-1 border rounded text-right disabled:bg-gray-100 disabled:cursor-not-allowed"
                      defaultValue={entry?.overallDiscount}
                      disabled={!isEditable}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {isEditable && (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
          >
            Update Entry
          </button>
        )}
        <section>
          <div className="overflow-x-auto">
            <table className="w-full text-center mt-4 border-collapse [&_th]:bg-gray-200 border border-gray-200 [&_th,_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 [&_th]:p-2 [&_td]:p-2">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Payment Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className=" [&_tr:nth-child(even)]:bg-gray-100">
                {entry?.payments?.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(payment?.paymentDate)}</td>
                    <td>{payment.amount}</td>
                    <td>
                      <div className="flex gap-1 justify-center">
                        <a
                          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                          href={`/entries/vendor/edit/${payment._id}`}
                        >
                          <FaPencil />
                        </a>
                        <ConfirmDialog
                          className="p-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition duration-200"
                          message="Do you really want to delete this payment?"
                          label="Delete"
                        >
                          <FaTrash />
                        </ConfirmDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <a
          href="/entries/vendor/all"
          className="flex items-center gap-2 underline underline-offset-4 text-blue-600"
        >
          <FaArrowLeft />
          <span>All Entries</span>
        </a>
      </main>
    </main>
  );
}
