import {
  FaBullseye,
  FaCalendar,
  FaDollarSign,
  FaEye,
  FaHashtag,
  FaPencil,
  FaTrash,
} from "react-icons/fa6";
import AddPaymentDialog from "./AddPaymentDialog";

export default function PreviousPayments({ alreadyPaid, duePayment }) {
  return (
    <section className="bg-white p-6 rounded-lg shadow flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Previous Payments</h2>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg transition cursor-pointer disabled:opacity-50"
        >
          {/* {loading ? "Adding..." : "Add Entry"} */}
          Add a Payment
        </button>
      </div>
      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>SL</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaBullseye />
                <span>Actions</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaCalendar />
                <span>Payment Date</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Amount</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Due After Payment</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {customers.map((customer, index) => (
                <tr key={customer._id} className="hover:bg-gray-100">
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.mobileNumber}</td>
                  <td>{customer.address}</td>
                  <td>
                    <div className="flex gap-1">
                      <a
                        href={`/customers/view/${customer._id}`}
                        className="p-2 bg-blue-600 text-white rounded-md"
                      >
                        <FaEye />
                      </a>
                      <a
                        href={`/customers/edit/${customer._id}`}
                        className="p-2 bg-green-600 text-white rounded-md"
                      >
                        <FaPencil />
                      </a>
                      <button
                        className="p-2 bg-red-600 text-white rounded-md cursor-pointer"
                        onClick={() => openConfirmDialog(customer._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))} */}

          <tr>
            <td>1</td>
            <td>
              <div className="flex gap-1">
                <a
                  // href={`/customers/view/${customer._id}`}
                  className="p-2 bg-blue-600 text-white rounded-md cursor-pointer"
                >
                  <FaEye />
                </a>
                <a
                  // href={`/customers/edit/${customer._id}`}
                  className="p-2 bg-green-600 text-white rounded-md cursor-pointer"
                >
                  <FaPencil />
                </a>
                <button
                  className="p-2 bg-red-600 text-white rounded-md cursor-pointer"
                  // onClick={() => openConfirmDialog(customer._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </td>
            <td>15/04/2025</td>
            <td>500</td>
            <td>9000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total</th>
            <th>{alreadyPaid}</th>
            <th>{duePayment}</th>
          </tr>
        </tfoot>
      </table>
          <AddPaymentDialog />
    </section>
  );
}
