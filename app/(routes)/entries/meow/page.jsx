"use client";

import { fetchCustomers } from "@/app/(routes)/customers/all/actions";
import CustomerForm from "./components/CustomerForm";
import ProductSection from "./components/ProductSection";
import SummarySection from "./components/SummarySection";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/(routes)/products/all/actions";
import Toast from "./components/Toast";

export default function Meow() {
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    mobileNumber: "",
    address: "",
  });
  const [orderDate, setOrderDate] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [shippingCustomer, setShippingCustomer] = useState(0);
  const [shippingMerchant, setShippingMerchant] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("Pathao");
  const [otherCost, setOtherCost] = useState(0);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch customers when the component mounts
  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    loadCustomers();
  }, []);

  // Fetch customers when the component mounts
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    loadProducts();
  }, []);

  const subTotal =
    selectedProducts.reduce((acc, product) => {
      const { sellPrice, discount, quantity } = product;
      const subTotal = sellPrice * quantity - discount;
      return acc + subTotal;
    }, 0) - overallDiscount;

  const totalDiscount =
    selectedProducts.reduce((acc, product) => {
      const { discount } = product;
      const subTotal = discount;
      return acc + subTotal;
    }, 0) + overallDiscount;

  const paidByCustomer = subTotal + shippingCustomer;

  const totalShippingCharge = shippingCustomer + shippingMerchant;

  const totalPurchasePrice = selectedProducts.reduce((acc, product) => {
    const { purchasePrice, quantity } = product;
    const subTotal = purchasePrice * quantity;
    return acc + subTotal;
  }, 0);

  // todo: verify this formula from client
  const totalSellPrice = selectedProducts.reduce((acc, product) => {
    const { sellPrice, quantity } = product;
    const subTotal = sellPrice * quantity;
    return acc + subTotal;
  }, 0);

  const [courierTax, setCourierTax] = useState(
    (subTotal + totalShippingCharge) * 0.01
  );

  // Automatically update courierTax when subTotal or totalShippingCharge changes
  useEffect(() => {
    // Check if the current courierTax matches the calculated value
    const calculatedCourierTax = (subTotal + totalShippingCharge) * 0.01;

    // Only update if the user hasn't manually edited it
    if (courierTax === calculatedCourierTax || courierTax === 0) {
      setCourierTax(calculatedCourierTax);
    }
  }, [subTotal, totalShippingCharge]);

  const totalIncome = subTotal - courierTax - otherCost;

  const totalQuantity = selectedProducts.reduce((acc, product) => {
    const { quantity } = product;
    return acc + quantity;
  }, 0);

  const netProfit = totalIncome - totalPurchasePrice;

  // Create the request body for the entry
  const entry = {
    invoiceNumber,
    orderStatus: "Pending",
    customer,
    orderDate,
    entryDate,
    paymentDate,
    products: selectedProducts,
    shippingCustomer,
    shippingMerchant,
    shippingMethod,
    otherCost,
    subTotal,
    paidByCustomer,
    totalShippingCharge,
    courierTax,
    totalIncome,
    totalPurchasePrice,
    totalSellPrice,
    totalDiscount,
    totalQuantity,
    overallDiscount,
    netProfit,
    selectedProducts,
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let customerId = customer.id; // Use existing customer ID if available

      // If the customer doesn't have an ID, create a new customer
      if (!customerId) {
        const newCustomer = {
          name: customer.name,
          mobileNumber: customer.mobileNumber,
          address: customer.address,
        };

        // Send a POST request to create the new customer
        const res = await fetch("/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to create customer: ${errorText}`);
        }

        const { _id } = await res.json(); // Get the new customer ID
        customerId = _id; // Assign the new customer ID
      }

      // Create a new entry object with the correct customer ID
      const entryWithCustomerId = {
        ...entry,
        customer: customerId, // Replace the customer object with its ID
      };

      // Send the entry data
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryWithCustomerId),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create entry: ${errorText}`);
      }

      const newEntry = await res.json();
      console.log("Entry created successfully:", newEntry);
    } catch (error) {
      console.error("Error creating entry:", error.message);
    }
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-blue-600">Grahok Database</h1>
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">Add New Entry</h1>
        <input
          type="number"
          placeholder="Invoice Number"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setInvoiceNumber(Number(e.target.value))}
        />
      </header>

      <form className="space-y-10" onSubmit={handleSubmit}>
        <CustomerForm
          customers={customers}
          customer={customer}
          setCustomer={setCustomer}
          orderDate={orderDate}
          setOrderDate={setOrderDate}
          entryDate={entryDate}
          setEntryDate={setEntryDate}
          paymentDate={paymentDate}
          setPaymentDate={setPaymentDate}
        />

        <ProductSection
          products={products}
          setProducts={setProducts}
          product={product}
          setProduct={setProduct}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />

        <SummarySection
          subTotal={subTotal}
          paidByCustomer={paidByCustomer}
          totalShippingCharge={totalShippingCharge}
          courierTax={courierTax}
          setCourierTax={setCourierTax}
          otherCost={otherCost}
          setOtherCost={setOtherCost}
          totalIncome={totalIncome}
          totalPurchasePrice={totalPurchasePrice}
          overallDiscount={overallDiscount}
          setOverallDiscount={setOverallDiscount}
          shippingCustomer={shippingCustomer}
          setShippingCustomer={setShippingCustomer}
          shippingMerchant={shippingMerchant}
          setShippingMerchant={setShippingMerchant}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
          netProfit={netProfit}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200"
        >
          Create Entry
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
