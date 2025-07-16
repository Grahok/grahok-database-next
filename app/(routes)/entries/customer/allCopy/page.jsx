export const dynamic = "force-dynamic";

import fetchCustomerEntries from "@/features/entries/customer/actions/fetchCustomerEntries copy";
import { DataTable } from "./data-table";

export default async function AllCustomers() {
  const customerEntries = (await fetchCustomerEntries()) || [];

  // ✅ Calculate totals
  const totals = customerEntries.reduce(
    (acc, row) => {
      acc.totalPurchasePrice += row.totalPurchasePrice || 0;
      acc.totalSellPrice += row.totalSellPrice || 0;
      acc.paidByCustomer += row.paidByCustomer || 0;
      acc.totalQuantity += row.totalQuantity || 0;
      acc.totalDiscount += row.totalDiscount || 0;
      acc.shippingCustomer += row.shippingCustomer || 0;
      acc.shippingMerchant += row.shippingMerchant || 0;
      acc.otherCost += row.otherCost || 0;
      acc.courierTax += row.courierTax || 0;
      acc.netProfit += row.netProfit || 0;
      return acc;
    },
    {
      totalPurchasePrice: 0,
      totalSellPrice: 0,
      paidByCustomer: 0,
      totalQuantity: 0,
      totalDiscount: 0,
      shippingCustomer: 0,
      shippingMerchant: 0,
      otherCost: 0,
      courierTax: 0,
      netProfit: 0,
    }
  );

  return (
    <div className="container mx-auto py-10">
      <DataTable totals={totals} data={customerEntries} />
    </div>
  );
}
