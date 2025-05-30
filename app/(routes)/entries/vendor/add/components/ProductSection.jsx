import { fetchProducts } from "@/app/(routes)/products/all/actions";
import { useEffect, useState } from "react";
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";

export default function ProductSection({
  selectedProducts,
  setSelectedProducts,
}) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetchProducts();
        const { products } = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    loadProducts();
  }, []);

  const selectedIds = selectedProducts.map((row) => row.product._id); // Use _id consistently
  const filtered = products.filter(
    (p) =>
      !selectedIds.includes(p._id) && // Use _id here
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleProductSelect = (product) => {
    const newRow = {
      id: Date.now(),
      product,
      quantity: 1,
      inStock: product.inStock,
      purchasePrice: product.purchasePrice || 0,
      sellPrice: product.sellPrice || 0,
      discount: 0,
    };
    setSelectedProducts((prev) => [...prev, newRow]);
    setSearch("");
  };

  const updateRow = (id, field, value) => {
    setSelectedProducts((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: Number(value) } : row
      )
    );
  };

  const removeRow = (id) => {
    setSelectedProducts((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">Add Products</h2>

      {/* Product Dropdown */}
      <div className="relative max-w-80">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-expanded={dropdownOpen}
          aria-controls="product-dropdown"
          className="w-full px-4 py-2 bg-white border rounded shadow flex justify-between items-center cursor-pointer"
        >
          <span>Select a Product</span>
          <FaChevronDown />
        </button>

        <div
          id="product-dropdown"
          className={`absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-64 overflow-y-auto ${
            dropdownOpen ? "" : "hidden"
          }`}
          role="listbox"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
              aria-label="Search products"
            />
          </div>

          {filtered.map((product) => (
            <button
              type="button"
              key={product._id}
              role="option"
              aria-selected={dropdownOpen}
              onClick={() => handleProductSelect(product)}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 focus:bg-gray-200"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-gray-500">
                  ৳{product.sellPrice}
                </span>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="p-4 text-sm text-gray-500 text-center">
              No product available
            </div>
          )}
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full table-auto border-spacing-4 border [&_th,_td]:border [&_th,_td]:border-gray-300 [&_th,_td]:p-2 [&_th]:bg-gray-200">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Quantity</th>
            <th>In Stock</th>
            <th>Purchase Price</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((row) => (
            <tr key={row.id}>
              <td>{row.product.name}</td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0.25}
                  step={0.25}
                  value={row.quantity}
                  onChange={(e) =>
                    updateRow(row.id, "quantity", e.target.value)
                  }
                />
              </td>
              <td>{row.inStock}</td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                  value={row.purchasePrice}
                  onChange={(e) =>
                    updateRow(row.id, "purchasePrice", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={0}
                  placeholder={0}
                  onChange={(e) =>
                    updateRow(row.id, "discount", e.target.value)
                  }
                />
              </td>
              <td>
                {(row.quantity * row.purchasePrice - row.discount).toFixed(2)}
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
          ))}
        </tbody>
      </table>
    </section>
  );
}
