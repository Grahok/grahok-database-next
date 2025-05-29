import baseUrl from "@/constants/baseUrl";
import formatDate from "@/utils/formatDate";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";

export default async function VendorOrders({ vendorId }) {
  const response = await fetch(`${baseUrl}/api/entries/vendor/${vendorId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const { entries } = await response.json();

  return (
    <>
      {entries?.map((entry, index) => (
        <tr key={entry._id}>
          <td>{index + 1}</td>
          <td>{formatDate(entry?.orderDate)}</td>
          <td>{formatDate(entry?.entryDate)}</td>
          <td>{entry.orderStatus}</td>
          <td>{entry.totalPayment}</td>
          <td>{entry.alreadyPaid}</td>
          <td>{entry.duePayment}</td>
          <td>
            <div className="flex gap-1 justify-center">
              <a
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                href={`/entries/vendor/view/${entry._id}`}
              >
                <FaEye />
              </a>
              <a
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                href={`/entries/vendor/edit/${entry._id}`}
              >
                <FaPencil />
              </a>
              <button className="p-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition duration-200">
                <FaTrash />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
