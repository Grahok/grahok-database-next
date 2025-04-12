"use client";

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const productData = Object.fromEntries(formData);

  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (response.ok) {
    e.target.reset();
  }
}
export default function AddProduct() {
  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="bg-white p-6 rounded-lg shadow space-y-6"
      aria-labelledby="product-section-title"
    >
      <h2 id="product-section-title" className="text-2xl font-semibold">
        Add Product
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="purchasePrice">Purchase Price</label>
        <input
          type="number"
          name="purchasePrice"
          id="purchasePrice"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sellPrice">Sell Price</label>
        <input
          type="number"
          name="sellPrice"
          id="sellPrice"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="inStock">In Stock</label>
        <input
          type="number"
          name="inStock"
          id="inStock"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Add Product
      </button>
    </form>
  );
}
