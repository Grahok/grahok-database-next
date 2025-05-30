import { FaArrowLeft } from "react-icons/fa6";
import { getVendorEntry } from "./actions/getVendorEntry";
import inputDateFormat from "@/utils/inputDateFormat";

export default async function ViewEntry({ params }) {
  const { entryId } = await params;

  const response = await getVendorEntry(entryId);
  const { entry } = await response.json();
  entry.orderDate = inputDateFormat(entry.orderDate);
  entry.entryDate = inputDateFormat(entry.entryDate);

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800 flex flex-col gap-8">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">View Entry</h1>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Invoice Number"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-right w-24 bg-gray-100 cursor-not-allowed"
            defaultValue={entry?.invoiceNumber}
            disabled
          />

          <select
            name="orderStatus"
            id="orderStatus"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 cursor-not-allowed"
            defaultValue={entry?.orderStatus}
            disabled
          >
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
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
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 cursor-not-allowed"
                placeholder="Order Date"
                defaultValue={entry?.orderDate || ""}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="entryDate">Entry Date</label>
              <input
                id="entryDate"
                type="date"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 cursor-not-allowed"
                placeholder="Entry Date"
                defaultValue={entry?.entryDate || ""}
                disabled
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
                <th>Sell Price</th>
                <th>Discount</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {entry?.products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td>{product?.product.name}</td>
                  <td>{product?.quantity}</td>
                  <td>{product?.inStock}</td>
                  <td>{product?.purchasePrice}</td>
                  <td>{product?.sellPrice}</td>
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
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                defaultValue={entry?.shippingMerchant}
                disabled
              />
            </div>
            <div>
              <label className="text-sm">Shipping Method</label>
              <select
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                disabled
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
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          {/* Summary Table */}
          <div>
            <table className="w-full table-auto border-spacing-y-4 border-separate">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>{entry?.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Paid by Merchant</td>
                  <td>{entry?.paidByMerchant.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping Charge</td>
                  <td>{entry?.totalShippingCharge.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total Payment</td>
                  <td>{entry?.totalPayment.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Courier Tax</td>
                  <td>
                    <input
                      type="number"
                      placeholder={0}
                      min={0}
                      defaultValue={entry?.courierTax}
                      className="w-24 p-1 border rounded text-right bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Overall Discount</td>
                  <td>
                    <input
                      type="number"
                      placeholder={0}
                      className="w-24 p-1 border rounded text-right bg-gray-100 cursor-not-allowed"
                      defaultValue={entry?.overallDiscount}
                      disabled
                    />
                  </td>
                </tr>
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
