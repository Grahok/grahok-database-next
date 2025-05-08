"use client";

import { ORDER_STATUSES } from "@/constants/orderStatuses";

import { useState } from "react";
import Toast from "@/app/(routes)/entries/customer/add/components/Toast";
import SummarySection from "@/app/(routes)/entries/customer/add/components/SummarySection";
import ProductSection from "@/app/(routes)/entries/customer/add/components/ProductSection";
import CustomerForm from "@/app/(routes)/entries/customer/add/components/CustomerForm";
import combineDateWithCurrentTime from "@/utils/combineDateWithCurrentTime";

export default function AddEntry() {
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [cnNumber, setCnNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const subtotal = selectedProducts.reduce(
    (sum, row) => sum + row.quantity * row.sellPrice - row.discount,
    0
  );
  const totalPurchasePrice = selectedProducts.reduce(
    (sum, row) => sum + row.quantity * row.purchasePrice,
    0
  );
  const [shippingCustomer, setShippingCustomer] = useState(0);
  const paidByCustomer = subtotal + shippingCustomer - overallDiscount;
  const [shippingMerchant, setShippingMerchant] = useState(0);
  const totalShippingCharge = shippingCustomer + shippingMerchant;
  const [otherCost, setOtherCost] = useState(0);
  const [courierTax, setCourierTax] = useState(0);
  const totalIncome =
    paidByCustomer - totalShippingCharge - courierTax - otherCost;
  const netProfit = totalIncome - totalPurchasePrice;
  const [toast, setToast] = useState({ show: false, message: "" });
  const [shippingMethod, setShippingMethod] = useState("Steadfast");
  const [note, setNote] = useState("");

  const handleCustomerChange = (data) => {
    setCustomerData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let customerId;

      // 🔍 Check if it's an existing customer (already has _id)
      if (customerData._id) {
        customerId = customerData._id;
      } else {
        // 🆕 Create a new customer
        const res = await fetch("/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: customerData.name,
            mobileNumber: customerData.mobileNumber,
            address: customerData.address,
            entryDate: combineDateWithCurrentTime(e.target.entryDate.value),
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to create new customer.");
        }

        const { createdCustomer: newCustomer } = await res.json();
        customerId = newCustomer._id;
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
        cnNumber,
        orderStatus,
        customer: customerId,
        orderDate: combineDateWithCurrentTime(e.target.orderDate.value),
        entryDate: combineDateWithCurrentTime(e.target.entryDate.value),
        paymentDate:
          combineDateWithCurrentTime(e.target.paymentDate.value) || null,
        products: selectedProducts.map((p) => ({
          product: p.product._id,
          quantity: Number(p.quantity),
          purchasePrice: Number(p.purchasePrice),
          sellPrice: Number(p.sellPrice),
          discount: Number(p.discount || 0),
          subtotal: Number(p.quantity * p.sellPrice - p.discount),
        })),
        subtotal,
        paidByCustomer,
        shippingCustomer,
        shippingMerchant,
        totalShippingCharge,
        shippingMethod,
        otherCost,
        note,
        courierTax,
        totalQuantity,
        totalPurchasePrice,
        totalSellPrice,
        totalDiscount,
        overallDiscount,
        totalIncome,
        netProfit,
      };

      console.log(entry);

      // 💾 Post the entry
      const entryRes = await fetch("/api/entries/customer", {
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
      }, 2000);
      window.location.reload();
    } catch (err) {
      console.error(err.error || err.message);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col gap-8">
      <header className="flex justify-between items-center gap-6">
        <h1 className="text-3xl font-bold">Add New Entry</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="number"
              name="inVoiceNumber"
              id="invoiceNumber"
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
          {["Shipped", "Delivered"].includes(orderStatus) && (
            <input
              type="text"
              name="cnNumber"
              id="cnNumber"
              placeholder="CN Number"
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setCnNumber(e.target.value)}
            />
          )}
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Customer Section */}
        <CustomerForm onCustomerChange={handleCustomerChange} />

        {/* Product Section */}
        <ProductSection
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />

        {/* Summary */}
        <SummarySection
          shippingCustomer={shippingCustomer}
          setShippingCustomer={setShippingCustomer}
          shippingMerchant={shippingMerchant}
          setShippingMerchant={setShippingMerchant}
          courierTax={courierTax}
          setCourierTax={setCourierTax}
          otherCost={otherCost}
          note={note}
          setNote={setNote}
          setOtherCost={setOtherCost}
          overallDiscount={overallDiscount}
          setOverallDiscount={setOverallDiscount}
          subtotal={subtotal}
          paidByCustomer={paidByCustomer}
          totalPurchasePrice={totalPurchasePrice}
          totalShippingCharge={totalShippingCharge}
          totalIncome={totalIncome}
          netProfit={netProfit}
          setShippingMethod={setShippingMethod}
        />

        {/* Error or Loading Feedback */}
        {error && <div className="text-red-600">{error}</div>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
          disabled={loading || !customerData}
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
