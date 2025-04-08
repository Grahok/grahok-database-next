"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Toast from "@/components/Toast";
import SummarySection from "@/components/SummarySection";
import ProductSection from "@/components/ProductSection";
import CustomerForm from "@/components/CustomerForm";
import { getCustomers } from "@/app/customers/all/actions";
import { createCustomer } from "@/app/customers/add/actions";

export default function AddEntry() {
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shippingCustomer, setShippingCustomer] = useState(0);
  const [shippingMerchant, setShippingMerchant] = useState(0);
  const [otherCost, setOtherCost] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Load customer list
  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await getCustomers();
      if (result.success) {
        setCustomers(result.customers);
      } else {
        console.error(result.error);
      }
    };
    fetchCustomers();
  }, []);

  // Filter customers for dropdown
  const filtered = customers.filter((c) =>
    [c.name, c.mobileNumber, c.address]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Select a customer from dropdown
  const handleCustomerSelect = (customer) => {
    setCustomer(customer);
    setDropdownOpen(false);
  };

  // Form submission
  const handleAddProduct = async (e) => {
    e.preventDefault();

    let finalCustomer = customer;

    try {
      // Create new customer if _id is missing
      if (!customer?._id) {
        const result = await createCustomer({
          name: customer?.name || "",
          mobileNumber: customer?.mobileNumber || "",
          address: customer?.address || "",
        });

        if (result.success) {
          finalCustomer = result.customer; // Use newly created one
          setCustomer(result.customer); // Update UI
        } else {
          console.error(result.error);
          return alert("Failed to create customer");
        }
      }

      // 👉 Proceed with finalCustomer (either new or existing)
      console.log("Final customer to save with:", finalCustomer);

      // Here you'd save the full form data with products, summary, etc.

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Grahok Database</h1>
      </header>

      <form className="space-y-10" onSubmit={handleAddProduct}>
        {/* Customer Dropdown */}
        <div className="relative w-80">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-controls="customer-dropdown"
            className="w-full px-4 py-2 bg-white border rounded shadow flex justify-between items-center"
          >
            <span>{customer ? customer.name : "Select a Customer"}</span>
            <FaChevronDown />
          </button>

          <div
            id="customer-dropdown"
            className={`absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-64 overflow-y-auto ${
              dropdownOpen ? "" : "hidden"
            }`}
            role="listbox"
          >
            <div className="p-2">
              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                aria-label="Search customers"
              />
            </div>

            {filtered.map((customer) => (
              <button
                key={customer._id}
                role="option"
                onClick={() => handleCustomerSelect(customer)}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-200"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{customer.name}</span>
                  <span className="text-xs text-gray-500">
                    {customer.mobileNumber}
                  </span>
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="p-4 text-sm text-gray-500 text-center">
                No customer available
              </div>
            )}
          </div>
        </div>

        {/* Editable Form */}
        <CustomerForm customer={customer} setCustomer={setCustomer} />

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
          otherCost={otherCost}
          setOtherCost={setOtherCost}
        />

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer"
          >
            Add Product
          </button>
          <Toast
            message="Product added successfully!"
            show={showToast}
            onClose={() => setShowToast(false)}
          />
        </div>
      </form>
    </div>
  );
}
