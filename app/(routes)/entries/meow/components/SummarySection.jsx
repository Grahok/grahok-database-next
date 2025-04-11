export default function SummarySection({
  setShippingCustomer,
  setShippingMerchant,
  setOtherCost,
  setShippingMethod,
  shippingMethod, // Add shippingMethod to props
  subTotal,
  paidByCustomer,
  totalShippingCharge,
  courierTax,
  setCourierTax,
  totalIncome,
  totalPurchasePrice,
  overallDiscount,
  setOverallDiscount,
  netProfit,
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-24 bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col gap-6 *:flex *:flex-col *:gap-1">
        <div>
          <label>Shipping Customer:</label>
          <input
            type="number"
            placeholder={0}
            onChange={(e) => setShippingCustomer(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Shipping Merchant:</label>
          <input
            type="number"
            placeholder={0}
            onChange={(e) => setShippingMerchant(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="text-sm">Shipping Method</label>
          <select
            className="w-full p-2 border rounded cursor-pointer"
            required
            value={shippingMethod} // Bind the value to the state
            onChange={(e) => {
              console.log("Selected shipping method:", e.target.value);
              setShippingMethod(e.target.value);
            }}
          >
                <option key="Pathao" value="Pathao" className="cursor-pointer">
                  Pathao
                </option>
            {["Steadfast", "Sunderban", "Korotoa", "Janani"].map(
              (opt) => (
                <option key={opt} value={opt} className="cursor-pointer">
                  {opt}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <span>Other Cost:</span>
          <input
            type="number"
            placeholder={0}
            onChange={(e) => setOtherCost(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>
      <div>
        <table className="w-full table-auto border-spacing-y-4 border-separate">
          <tbody>
            <tr>
              <td>Subtotal:</td>
              <td>{subTotal}</td>
            </tr>
            <tr>
              <td>Paid by Customer:</td>
              <td>{paidByCustomer}</td>
            </tr>
            <tr>
              <td>Total Purchase Price:</td>
              <td>{totalPurchasePrice}</td>
            </tr>
            <tr>
              <td>Total Shipping Charge:</td>
              <td>{totalShippingCharge}</td>
            </tr>
            <tr>
              <td>Courier Tax:</td>
              <td>
                <input
                  type="number"
                  placeholder={0}
                  value={courierTax}
                  onChange={(e) => setCourierTax(Number(e.target.value))}
                  className="w-24 p-1 border rounded text-right"
                />
              </td>
            </tr>
            <tr>
              <td>Total Income:</td>
              <td>{totalIncome}</td>
            </tr>
            <tr>
              <td>Overall Discount:</td>
              <td>
                <input
                  type="number"
                  placeholder={0}
                  value={overallDiscount}
                  onChange={(e) => setOverallDiscount(Number(e.target.value))}
                  className="w-24 p-1 border rounded text-right"
                />
              </td>
            </tr>
            <tr>
              <td>Net Profit:</td>
              <td>{netProfit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
