import { FaChevronDown, FaTrashCan } from "react-icons/fa6";

export default function ProductSection() {
  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Add Products</h2>

      {/* Dropdown */}
      <div className="relative w-80">
        <button
          onClick={() =>
            document.getElementById("dropdown").classList.toggle("hidden")
          }
          className="w-full px-4 py-2 bg-white border rounded shadow flex justify-between items-center cursor-pointer"
        >
          <span>Select a Product</span>
          <FaChevronDown />
        </button>

        <div
          id="dropdown"
          className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-64 overflow-y-auto hidden"
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          {filtered.map((product) => (
            <div
              key={product.id}
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProductSelect(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-8 h-8 rounded"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-gray-500">
                  ৳{product.sellPrice}
                </span>
              </div>
            </div>
          ))}
          
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full table-auto border-spacing-4 border-separate">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Sell Price</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={1}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                  placeholder={0}
                />
              </td>
              <td>
                {(row.quantity * row.sellPrice - row.discount).toFixed(2)}
              </td>
              <td>
                <button
                  onClick={() => removeRow(row.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  <FaTrashCan />
                </button>
              </td>
            </tr>

        </tbody>
      </table>
    </section>
  );
}
