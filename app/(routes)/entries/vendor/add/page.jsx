"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SummarySection from "@/features/entries/vendor/add/components/SummarySection";
import ProductSection from "@/features/entries/vendor/add/components/ProductSection";
import VendorForm from "@/features/entries/vendor/add/components/VendorForm";
import Toast from "@/components/Toast";

export default function AddVendorEntry() {
  const router = useRouter();

  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [note, setNote] = useState("");
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
  const paidByMerchant = subtotal + shippingCharge - overallDiscount;
  const [otherCost, setOtherCost] = useState(0);
  const [courierTax, setCourierTax] = useState(0);
  const totalPayment = paidByMerchant - courierTax - otherCost;
  // const alreadyPaid = totalPayment - totalPurchasePrice;
  const alreadyPaid = 0; // todo: For Now, to be fixed
  const duePayment = totalPayment - alreadyPaid;
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

        const { vendor } = await res.json();
        vendorId = vendor._id;
      }

      const totalQuantity = Number(
        selectedProducts.reduce((sum, p) => sum + p.quantity, 0)
      );
      const totalDiscount =
        Number(selectedProducts.reduce((sum, p) => sum + p.discount, 0)) +
        Number(overallDiscount);

      const entry = {
        invoiceNumber,
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
        paidByMerchant,
        shippingCharge,
        shippingMethod,
        otherCost,
        note,
        courierTax,
        totalQuantity,
        totalPurchasePrice,
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
        setToast((prev) => ({
          ...prev,
          show: false,
        }));
        router.back();
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
        <h1 className="text-3xl font-bold">Add Vendor Entry</h1>
        <input
          type="number"
          id="invoiceNumber"
          placeholder="Invoice Number"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setInvoiceNumber(Number(e.target.value))}
          autoFocus
        />
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
          note={note}
          setNote={setNote}
          overallDiscount={overallDiscount}
          setOverallDiscount={setOverallDiscount}
          subtotal={subtotal}
          paidByMerchant={paidByMerchant}
          totalPayment={totalPayment}
          setShippingMethod={setShippingMethod}
        />

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
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    </main>
  );
}
