import { Suspense } from "react";
import VendorDetails from "./components/VendorDetails";
import VendorOrders from "./components/VendorOrders";
import VendorPayments from "./components/VendorPayments";

export default async function ViewVendor({ params }) {
  const { vendorId } = await params;

  return (
    <main>
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">View Vendor</h1>
          <a
            href="/vendors/all"
            className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            All Vendors
          </a>
        </div>
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
                    <th>Order Date</th>
                    <th>Entry Date</th>
                    <th>Status</th>
                    <th>Total Payment</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className=" [&_tr:nth-child(even)]:bg-gray-100">
                  <Suspense
                    fallback={
                      <tr>
                        <td colSpan={6}>Loading...</td>
                      </tr>
                    }
                  >
                    <VendorOrders vendorId={vendorId} />
                  </Suspense>
                </tbody>

                {/* <Toast
          show={toast.show}
          message={toast.message}
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
        <ConfirmDialog
          ref={confirmDialogRef}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this entry?"
        /> */}
              </table>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Payments</h1>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Payment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center mt-4 border-collapse [&_th]:bg-gray-200 border border-gray-200 [&_th,_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 [&_th]:p-2 [&_td]:p-2">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Payment Date</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className=" [&_tr:nth-child(even)]:bg-gray-100">
                  <Suspense
                    fallback={
                      <tr>
                        <td colSpan={6}>Loading...</td>
                      </tr>
                    }
                  >
                    <VendorPayments vendorId={vendorId} />
                  </Suspense>
                </tbody>

                {/* <Toast
          show={toast.show}
          message={toast.message}
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
        <ConfirmDialog
          ref={confirmDialogRef}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this entry?"
        /> */}
              </table>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
}
