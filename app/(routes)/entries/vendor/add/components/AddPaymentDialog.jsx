export default function AddPaymentDialog() {
  return (
    <dialog open>
      <main className="flex flex-col items-start gap-3">
        <h3 className="font-medium text-xl">Add a Payment</h3>
        <div className="flex flex-col gap-1">
          <label htmlFor="paymentDate" className="text-sm">
            Payment Date
          </label>
          <input
            type="date"
            name="paymentDate"
            id="paymentDate"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="amount" className="text-sm">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md cursor-pointer">Submit</button>
      </main>
    </dialog>
  );
}
