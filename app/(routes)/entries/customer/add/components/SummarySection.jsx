import { SHIPPING_METHODS } from "@/constants/shippingMethods";

export default function SummarySection({
  shippingCustomer,
  setShippingCustomer,
  shippingMerchant,
  setShippingMerchant,
  courierTax,
  setCourierTax,
  setOtherCost,
  setOverallDiscount,
  subtotal,
  paidByCustomer,
  totalPurchasePrice,
  totalShippingCharge,
  totalIncome,
  netProfit,
  shippingMethod,
  setShippingMethod,
}) {
  return (
    <section className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Shipping & Options */}
      <div className="space-y-4">
        <div>
          <label className="text-sm">Shipping Charge (Customer)</label>
          <input
            type="number"
            placeholder={shippingCustomer}
            min={0}
            onChange={(e) => setShippingCustomer(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Shipping Charge (Merchant)</label>
          <input
            type="number"
            placeholder={shippingMerchant}
            min={0}
            onChange={(e) => setShippingMerchant(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Shipping Method</label>
          <select
            className="w-full p-2 border rounded"
            required
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            {SHIPPING_METHODS.map((shippingMethod, index) => (
              <option key={index} value={shippingMethod}>
                {shippingMethod}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm">Other Cost</label>
          <input
            type="number"
            placeholder={0}
            min={0}
            onChange={(e) => setOtherCost(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Summary Table */}
      <div>
        <table className="w-full table-auto border-spacing-y-4 border-separate">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>{subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Paid by Customer</td>
              <td>{paidByCustomer.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping Charge</td>
              <td>{totalShippingCharge.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Courier Tax</td>
              <td>
                <input
                  type="number"
                  placeholder={0}
                  min={0}
                  value={courierTax}
                  onChange={(e) => setCourierTax(Number(e.target.value))}
                  className="w-24 p-1 border rounded text-right"
                />
              </td>
            </tr>
            <tr>
              <td>Total Income</td>
              <td>{totalIncome.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Purchase</td>
              <td>{totalPurchasePrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Overall Discount</td>
              <td>
                <input
                  type="number"
                  placeholder={0}
                  onChange={(e) => setOverallDiscount(Number(e.target.value))}
                  className="w-24 p-1 border rounded text-right"
                />
              </td>
            </tr>
            <tr className="font-semibold">
              <td>Net Profit</td>
              <td>{netProfit.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
