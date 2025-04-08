export default function CustomerForm() {
  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Customer Info</h2>
        <input
          type="number"
          placeholder="Invoice Number"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Customer Name"
            autoFocus
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            id="mobileNumber"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Mobile Number"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Address"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="orderDate">Order Date</label>
          <input
            id="orderDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Order Date"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="entryDate">Entry Date</label>
          <input
            id="entryDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Entry Date"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="paymentDate">Payment Date</label>
          <input
            id="paymentDate"
            type="date"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Payment Date"
          />
        </div>
      </div>
    </section>
  );
}
