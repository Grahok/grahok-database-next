import {
  FaBullseye,
  FaEye,
  FaHashtag,
  FaLocationDot,
  FaPencil,
  FaPhone,
  FaTrash,
  FaUser,
} from "react-icons/fa6";

export default async function AllCustomers() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/customers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  const customers = await response.json();
  console.log(customers);
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-bold">All Customers:</h1>
      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>ID</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaUser />
                <span>Name</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaPhone />
                <span>Mobile Number</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaLocationDot />
                <span>Address</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaBullseye />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.mobileNumber}</td>
              <td>{customer.address}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href="/customers/view"
                    className="p-2 bg-blue-600 text-white rounded-md"
                  >
                    <FaEye />
                  </a>
                  <a
                    href="/customers/edit"
                    className="p-2 bg-green-600 text-white rounded-md"
                  >
                    <FaPencil />
                  </a>
                  <button className="p-2 bg-red-600 text-white rounded-md cursor-pointer">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
