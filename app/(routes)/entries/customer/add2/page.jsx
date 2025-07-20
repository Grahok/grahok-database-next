"use client";

import { ORDER_STATUSES } from "@/constants/orderStatuses";

import { useState } from "react";
import SummarySection from "./components/SummarySection";
import ProductSection from "./components/ProductSection";
import CustomerForm from "./components/CustomerForm";
import { Button } from "@/components/ui/button";
import sendParcelTrackingMessage from "@/features/entries/customer/add/actions/sendParcelTrackingMessage";
import { MessageSquareIcon } from "lucide-react";
import useEnterNavigation from "@/hooks/use-enter-navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import createCustomer from "@/features/customers/actions/createCustomer";
import createCustomerEntry from "@/features/entries/customer/add/actions/createCustomerEntry";
import { usePathname, useRouter } from "next/navigation";

export default function AddCustomerEntry() {
  useEnterNavigation({ autoSubmit: false });

  const router = useRouter();
  const pathname = usePathname();
  const [trackingLink, setTrackingLink] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [filteredCustomer, setFilteredCustomer] = useState({});
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
  const [shippingMethod, setShippingMethod] = useState("Steadfast");
  const [note, setNote] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (e.target.dataset.submitting === "true") return;
    e.target.dataset.submitting = "true";
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    let customerId = filteredCustomer?._id;
    if (!customerId) {
      const customerData = {
        name: formDataObj["name"],
        mobileNumber: formDataObj["mobileNumber"],
        address: formDataObj["address"],
      };
      const { createdCustomer } = await createCustomer(customerData);
      delete formDataObj.name;
      delete formDataObj.mobileNumber;
      delete formDataObj.address;
      customerId = createdCustomer?._id;
    }
    const entryObj = {
      ...formDataObj,
      customer: customerId,
      products: selectedProducts.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        purchasePrice: product.purchasePrice,
        sellPrice: product.sellPrice,
        discount: product.discount,
        subtotal: product.quantity * product.sellPrice - product.discount,
      })),
    };

    const { success } = await createCustomerEntry(entryObj);

    if (success) {
      toast.success("Customer entry created successfully");
    } else {
      toast.error("Failed to create customer entry");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="space-y-10">
        <header className="flex justify-between items-center gap-6">
          <h1 className="text-3xl font-bold">Add New Entry</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                name="invoiceNumber"
                placeholder="Invoice Number"
                autoFocus
              />

              <Select
                name="orderStatus"
                value={orderStatus}
                onValueChange={setOrderStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((orderStatus, index) => (
                    <SelectItem key={index} value={orderStatus}>
                      {orderStatus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {["Shipped", "Delivered"].includes(orderStatus) && (
              <>
                <Input
                  type="text"
                  name="cnNumber"
                  id="cnNumber"
                  placeholder="CN Number"
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    id="trackingLink"
                    placeholder="Tracking Link"
                    onChange={(e) => setTrackingLink(e.target.value)}
                  />
                  <Button
                    className="flex items-center"
                    onClick={async () => {
                      const { success, message } =
                        await sendParcelTrackingMessage(
                          customerData.mobileNumber,
                          shippingMethod,
                          trackingLink
                        );

                      if (success) {
                        toast.success(message);
                      } else {
                        toast.error(message);
                      }
                    }}
                  >
                    <MessageSquareIcon />
                    Send
                  </Button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Customer Section */}
        <CustomerForm
          filteredCustomer={filteredCustomer}
          setFilteredCustomer={setFilteredCustomer}
        />

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
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
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
        />

        <Button type="submit">Add Entry</Button>
      </form>
    </main>
  );
}
