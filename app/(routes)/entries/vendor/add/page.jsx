"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/(routes)/entries/vendor/add/components/Toast";
import SummarySection from "@/app/(routes)/entries/vendor/add/components/SummarySection";
import ProductSection from "@/app/(routes)/entries/vendor/add/components/ProductSection";
import VendorForm from "@/app/(routes)/entries/vendor/add/components/VendorForm";
import { ORDER_STATUSES } from "@/constants/orderStatuses";
import PreviousPayments from "./components/PreviousPayments";

export default function AddEntry() {
  const router = useRouter();

  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const subtotal = selectedProducts.reduce(
    (sum, row) => sum + row.quantity * row.purchasePrice - row.discount,
    0
  );
  const totalPurchasePrice = selectedProducts.reduce(
    (sum, row) => sum + row.quantity * row.purchasePrice,
    0
  );
  const [shippingCharge, setShippingCharge] = useState(0);
  const paidByVendor = subtotal + shippingCharge - overallDiscount;
  const [otherCost, setOtherCost] = useState(0);
  const [courierTax, setCourierTax] = useState(0);
  const totalPayment = paidByVendor - courierTax - otherCost;
  const alreadyPaid = totalPayment - totalPurchasePrice;
  const duePayment = totalPayment - totalPurchasePrice;
  const [toast, setToast] = useState({ show: false, message: "" });
  const [shippingMethod, setShippingMethod] = useState("Pathao");

  const handleVendorChange = (data) => {
    setVendorData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let vendorId;

      // 🔍 Check if it's an existing vendor (already has _id)
      if (vendorData._id) {
        vendorId = vendorData._id;
      } else {
        // 🆕 Create a new vendor
        const res = await fetch("/api/vendors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: vendorData.name,
            mobileNumber: vendorData.mobileNumber,
            address: vendorData.address,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to create new vendor.");
        }

        const newVendor = await res.json();
        vendorId = newVendor._id;
      }

      const totalQuantity = Number(
        selectedProducts.reduce((sum, p) => sum + p.quantity, 0)
      );
      const totalSellPrice = Number(
        selectedProducts.reduce((sum, p) => sum + p.sellPrice * p.quantity, 0)
      );
      const totalDiscount =
        Number(selectedProducts.reduce((sum, p) => sum + p.discount, 0)) +
        Number(overallDiscount);

      const entry = {
        invoiceNumber,
        orderStatus,
        vendor: vendorId,
        orderDate: e.target.orderDate.value,
        entryDate: e.target.entryDate.value,
        products: selectedProducts.map((p) => ({
          product: p.product._id,
          quantity: Number(p.quantity),
          purchasePrice: Number(p.purchasePrice),
          discount: Number(p.discount || 0),
          subtotal: Number(p.quantity * p.purchasePrice - p.discount),
        })),
        subtotal,
        paidByVendor,
        shippingCharge,
        shippingMethod,
        otherCost,
        courierTax,
        totalQuantity,
        totalSellPrice,
        totalDiscount,
        overallDiscount,
        totalPayment,
        alreadyPaid,
        duePayment,
      };

      // 💾 Post the entry
      const entryRes = await fetch("/api/entries/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (!entryRes.ok) {
        throw new Error("Failed to save entry.");
      }

      // ✅ Show success toast
      setToast({ show: true, message: "Entry added successfully." });

      setTimeout(() => {
        setToast({ show: false, message: "" });
        router.push("/entries/all");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col gap-8">
      <header className="flex justify-between items-center gap-6">
        <h1 className="text-3xl font-bold">Add New Entry</h1>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Invoice Number"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setInvoiceNumber(Number(e.target.value))}
            autoFocus
          />

          <select
            name="orderStatus"
            id="orderStatus"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            {ORDER_STATUSES.map((orderStatus, index) => (
              <option key={index} value={orderStatus}>
                {orderStatus}
              </option>
            ))}
          </select>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Vendor Section */}
        <VendorForm onVendorChange={handleVendorChange} />

        {/* Product Section */}
        <ProductSection
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />

        {/* Summary */}
        <SummarySection
          shippingCharge={shippingCharge}
          setShippingCharge={setShippingCharge}
          courierTax={courierTax}
          setCourierTax={setCourierTax}
          otherCost={otherCost}
          setOtherCost={setOtherCost}
          overallDiscount={overallDiscount}
          setOverallDiscount={setOverallDiscount}
          subtotal={subtotal}
          paidByVendor={paidByVendor}
          totalPayment={totalPayment}
          setShippingMethod={setShippingMethod}
        />
        <PreviousPayments alreadyPaid={alreadyPaid} duePayment={duePayment} />

        {/* Error or Loading Feedback */}
        {error && <div className="text-red-600">{error}</div>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
          disabled={loading || !vendorData}
        >
          {loading ? "Adding..." : "Add Entry"}
        </button>
      </form>
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </main>
  );
}
