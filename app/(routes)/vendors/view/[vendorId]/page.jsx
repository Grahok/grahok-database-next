import VendorDetails from "@/features/vendors/view/components/VendorDetails";
import VendorOrders from "@/features/vendors/view/components/VendorOrders";
import VendorPayments from "@/features/vendors/view/components/VendorPayments";

export default async function ViewVendor({ params }) {
  const { vendorId } = await params;

  return (
    <main>
      <header>
          <h1 className="text-2xl font-bold">View Vendor</h1>
      </header>
      <main className="grid grid-cols-1 gap-x-16 gap-y-8 p-4 xl:grid-cols-[1fr_2fr]">
        <VendorDetails vendorId={vendorId} />
        <section className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-semibold">Previous Orders</h1>
            <div className="overflow-x-auto">
              <table className="w-full text-center mt-4 border-collapse [&_th]:bg-gray-200 border border-gray-200 [&_th,_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 [&_th]:p-2 [&_td]:p-2">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Invoice Number</th>
                    <th>Order Date</th>
                    <th>Entry Date</th>
                    <th>Total Payment</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className=" [&_tr:nth-child(even)]:bg-gray-100">
                  <VendorOrders vendorId={vendorId} />
                </tbody>
              </table>
            </div>
          </div>
          <VendorPayments vendorId={vendorId} />
        </section>
      </main>
    </main>
  );
}
