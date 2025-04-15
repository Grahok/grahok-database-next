export default function Analytics() {
  return (
    <section className="w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <form className="flex flex-col md:flex-row items-start md:items-end gap-6 rounded-lg w-full max-w-2xl">
        <div className="flex flex-col w-full md:w-1/2">
          <label
            htmlFor="fromDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            From
          </label>
          <input
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="date"
            name="fromDate"
            id="fromDate"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label
            htmlFor="toDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            To
          </label>
          <input
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="date"
            name="toDate"
            id="toDate"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition w-full md:w-auto"
        >
          Search
        </button>
      </form>

      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Sell Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Amon Half Fiber</td>
            <td>10</td>
            <td>650</td>
            <td>1000</td>
            <td>350</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}
