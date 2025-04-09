import { fetchProducts } from "@/app/(routes)/products/all/actions";
import { useEffect, useState } from "react";
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";

export default function ProductSection({
  selectedProducts,
  setSelectedProducts,
}) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    loadProducts();
  }, []);

  const selectedIds = selectedProducts.map((row) => row.product.id);
  const filtered = products.filter(
    (p) =>
      !selectedIds.includes(p.id) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleProductSelect = (product) => {
    const newRow = {
      id: Date.now(),
      product,
      quantity: 1,
      purchasePrice: product.purchasePrice || 0,
      sellPrice: product.sellPrice || 0,
      discount: 0,
    };
    setSelectedProducts((prev) => [...prev, newRow]);
    document.getElementById("dropdown").classList.add("hidden");
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
              key={product._id}
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProductSelect(product)}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-gray-500">
                  ৳{product.sellPrice}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-4 text-sm text-gray-500 text-center">
              No products available
            </div>
          )}
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
          {selectedProducts.map((row) => (
            <tr key={row.id}>
              <td>{row.product.name}</td>
              <td>
                <input
                  type="number"
                  className="w-20 p-1 border rounded text-right"
                  min={1}
                  value={row.quantity}
                  onChange={(e) =>
                    updateRow(row.id, "quantity", e.target.value)
                  }
                />
              </td>
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
                  value={row.sellPrice}
                  onChange={(e) =>
                    updateRow(row.id, "sellPrice", e.target.value)
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
          ))}
        </tbody>
      </table>
    </section>
  );
}
