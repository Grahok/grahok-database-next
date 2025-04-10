"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import SummarySection from "@/components/SummarySection";
import ProductSection from "@/components/ProductSection";
import CustomerForm from "@/components/CustomerForm";
import ToastConfirmation from "@/components/ToastConfirmation"; // Import the component

export default function AddEntry() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shippingCustomer, setShippingCustomer] = useState(0);
  const [shippingMerchant, setShippingMerchant] = useState(0);
  const [otherCost, setOtherCost] = useState(0);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const [courierTax, setCourierTax] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Calculate values using useMemo for performance optimization
  const {
    subtotal,
    customerPayment,
    totalPurchase,
    totalShippingCharge,
    calculatedCourierTax,
    totalIncome,
    netProfit,
  } = useMemo(() => {
    const subtotal =
      selectedProducts.reduce(
        (sum, row) => sum + row.quantity * row.sellPrice - row.discount,
        0
      ) - overallDiscount;

    const customerPayment = subtotal + shippingCustomer;

    const totalPurchase = selectedProducts.reduce(
      (sum, row) => sum + row.quantity * row.purchasePrice,
      0
    );

    const totalShippingCharge = shippingCustomer + shippingMerchant;

    const calculatedCourierTax =
      Math.ceil((subtotal + totalShippingCharge) * 0.01) || 0;

    const totalIncome =
      customerPayment - totalShippingCharge - calculatedCourierTax - otherCost;

    const netProfit = totalIncome - totalPurchase;

    return {
      subtotal,
      customerPayment,
      totalPurchase,
      totalShippingCharge,
      calculatedCourierTax,
      totalIncome,
      netProfit,
    };
  }, [
    selectedProducts,
    shippingCustomer,
    shippingMerchant,
    overallDiscount,
    otherCost,
  ]);

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
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to create new customer.");
        }

        const newCustomer = await res.json();
        customerId = newCustomer._id;
      }

      const totalQuantity = Number(
        selectedProducts.reduce((sum, p) => sum + p.quantity, 0)
      );
      const totalSellPrice = Number(
        selectedProducts.reduce((sum, p) => sum + p.sellPrice * p.quantity, 0)
      );
      const totalPurchasePrice = Number(
        selectedProducts.reduce(
          (sum, p) => sum + p.purchasePrice * p.quantity,
          0
        )
      );
      const totalDiscount = Number(
        selectedProducts.reduce(
          (sum, p) => sum + p.discount + overallDiscount,
          0
        )
      );
      const subtotal = totalSellPrice - overallDiscount;
      const customerPayment = Number(
        selectedProducts.reduce(
          (sum, row) => sum + row.quantity * row.sellPrice - row.discount,
          0
        ) +
          shippingCustomer -
          overallDiscount
      );
      const totalShippingCharge = shippingCustomer + shippingMerchant;
      const totalIncome = customerPayment - totalShippingCharge - courierTax;
      const netProfit =
        subtotal - totalPurchasePrice - shippingMerchant - otherCost;

      const entry = {
        invoiceNumber: Number(e.target.invoiceNumber?.value || 0),
        customer: customerId,
        orderDate: e.target.orderDate.value,
        entryDate: e.target.entryDate.value,
        paymentDate: e.target.paymentDate.value || null,
        products: selectedProducts.map((p) => ({
          product: p.product._id, // Use the product's ObjectId
          quantity: Number(p.quantity),
          purchasePrice: Number(p.purchasePrice),
          sellPrice: Number(p.sellPrice),
          discount: Number(p.discount || 0),
          subtotal: Number(p.quantity * p.sellPrice - p.discount),
        })),
        shippingCustomer,
        shippingMerchant,
        totalShippingCharge,
        shippingMethod: e.target.shippingMethod?.value || "N/A",
        otherCost: Number(otherCost),
        courierTax: calculatedCourierTax,
        totalQuantity,
        totalPurchasePrice,
        totalSellPrice,
        totalDiscount: Number(totalDiscount),
        totalIncome,
        netProfit,
      };

      // 💾 Post the entry
      const entryRes = await fetch("/api/entries", {
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
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-blue-600">Grahok Database</h1>
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">Add New Entry</h1>
        <input
          type="number"
          placeholder="Invoice Number"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
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
          selectedProducts={selectedProducts}
          shippingCustomer={shippingCustomer}
          setShippingCustomer={setShippingCustomer}
          shippingMerchant={shippingMerchant}
          setShippingMerchant={setShippingMerchant}
          setCourierTax={setCourierTax}
          otherCost={otherCost}
          setOtherCost={setOtherCost}
          overallDiscount={overallDiscount}
          setOverallDiscount={setOverallDiscount}
          subtotal={subtotal}
          customerPayment={customerPayment}
          totalPurchase={totalPurchase}
          totalShippingCharge={totalShippingCharge}
          courierTax={calculatedCourierTax}
          totalIncome={totalIncome}
          netProfit={netProfit}
        />

        {/* Error or Loading Feedback */}
        {error && <div className="text-red-600">{error}</div>}

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || !customerData}
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
