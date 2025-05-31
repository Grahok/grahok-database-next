import { FaPencil, FaPhone } from "react-icons/fa6";
import baseUrl from "@/constants/baseUrl";

export default async function VendorDetails({ vendorId }) {
  const response = await fetch(`${baseUrl}/api/vendors/${vendorId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store",
  });
  const { vendor } = await response.json();

  return (
    <section>
      <div>
        <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 p-4 rounded-md mt-4">
          <img
            className="size-16 rounded-full"
            src="/avatar.png"
            alt={vendor?.name}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-xl font-semibold">{vendor?.name}</h3>
            <div className="flex gap-3 items-center">
            <a
              className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2 transition duration-200"
              href={vendor?.mobileNumber ? `tel:${vendor.mobileNumber}` : ""}
            >
              <FaPhone size={14} />
              Call
            </a>
            <a
              className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2 transition duration-200"
              href={`/vendors/edit/${vendorId}`}
            >
              <FaPencil size={14} />
              Edit
            </a>

            </div>
          </div>
        </div>

        <table className="w-full mt-4 border-collapse border border-gray-200 [&_th,_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200 [&_th]:p-2 [&_td]:p-2 [&_th]:text-left [&_td]:text-left">
          <tbody className="bg-gray-50 [&_tr:nth-child(odd)]:bg-gray-100">
            <tr>
              <th>Name</th>
              <td>{vendor?.name}</td>
            </tr>
            <tr>
              <th>Mobile</th>
              <td>{vendor?.mobileNumber}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{vendor?.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
