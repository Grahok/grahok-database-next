import { useState } from "react";
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";

export default function ProductSection({
  products,
  product,
  selectedProducts,
  setSelectedProducts,
}) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter products for dropdown
  const filteredProducts = products.filter(
    (product) =>
      !selectedProducts.some((selected) => selected._id === product._id) &&
      [product.name].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  function handleProductSelect(selectedProduct) {
    // Add the selected product to the selectedProducts array
    setSelectedProducts((prev) => [
      ...prev,
      { ...selectedProduct, quantity: 1, discount: 0 },
    ]);
    setSearch("");
    setDropdownOpen(false);
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Add Products</h2>
      {/* Product Dropdown */}
      <header className="relative w-80">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full px-4 py-2 bg-white border rounded shadow flex justify-between items-center cursor-pointer"
        >
          <span>{product?.name || "Select a Product"}</span>
          <FaChevronDown />
        </button>

        <div
          id="product-dropdown"
          className={`absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-64 overflow-y-auto ${
            dropdownOpen ? "" : "hidden"
          }`}
          role="listbox"
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

          {filteredProducts.map((product) => (
            <button
              key={product._id}
              type="button"
              onClick={() => handleProductSelect(product)}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-200"
              role="option"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-gray-500">
                  ৳{product.sellPrice}
                </span>
              </div>
            </button>
          ))}

          {filteredProducts.length === 0 && (
            <div className="p-4 text-sm text-gray-500 text-center">
              No product available
            </div>
          )}
        </div>
      </header>

      {/* Selected Products Table */}
      <table className="w-full table-auto border-spacing-4 border-separate text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Sell Price</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td>{product.name}</td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={1}
                  value={product?.quantity || 1}
                  onChange={(e) => {
                    const updatedProduct = {
                      ...product,
                      quantity: Number(e.target.value),
                    };
                    setSelectedProducts((prev) =>
                      prev.map((p) =>
                        p._id === product._id ? updatedProduct : p
                      )
                    );
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                  value={product?.purchasePrice || 0}
                  onChange={(e) => {
                    const updatedProduct = {
                      ...product,
                      purchasePrice: Number(e.target.value),
                    };
                    setSelectedProducts((prev) =>
                      prev.map((p) =>
                        p._id === product._id ? updatedProduct : p
                      )
                    );
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  className="w-20 p-1 border rounded text-right"
                  value={product?.sellPrice || 0}
                  onChange={(e) => {
                    const updatedProduct = {
                      ...product,
                      sellPrice: Number(e.target.value),
                    };
                    setSelectedProducts((prev) =>
                      prev.map((p) =>
                        p._id === product._id ? updatedProduct : p
                      )
                    );
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  className="w-20 p-1 border rounded text-right"
                  placeholder={0}
                  onChange={(e) => {
                    const updatedProduct = {
                      ...product,
                      discount: Number(e.target.value),
                    };
                    setSelectedProducts((prev) =>
                      prev.map((p) =>
                        p._id === product._id ? updatedProduct : p
                      )
                    );
                  }}
                />
              </td>
              <td>
                {Number(product.quantity) * Number(product.sellPrice) -
                  Number(product.discount)}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedProducts((prev) =>
                      prev.filter((p) => p._id !== product._id)
                    )
                  }
                  className="bg-red-500 text-white rounded-md p-2 flex justify-self-center cursor-pointer hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  <FaTrashCan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
