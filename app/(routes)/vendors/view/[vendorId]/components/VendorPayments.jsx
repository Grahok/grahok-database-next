import DialogButton from "@/components/Dialog";
import baseUrl from "@/constants/baseUrl";
import formatDate from "@/utils/formatDate";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";

export default async function VendorPayments({ vendorId }) {
  const response = await fetch(`${baseUrl}/api/entries/vendor/${vendorId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const { entries } = await response.json();
  const payments = entries.map((entry) => entry.payments).flat();

  console.log(payments)

  return (
    <>
      {payments?.map((payment, index) => (
        <tr key={payment._id}>
          <td>{index + 1}</td>
          <td>{formatDate(payment?.paymentDate)}</td>
          <td>{payment.amount}</td>
          <td>
            <div className="flex gap-1 justify-center">
              <a
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                href={`/entries/vendor/view/${payment._id}`}
              >
                <FaEye />
              </a>
              <a
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                href={`/entries/vendor/edit/${payment._id}`}
              >
                <FaPencil />
              </a>
              <DialogButton className="p-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition duration-200">
                <FaTrash />
              </DialogButton>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
