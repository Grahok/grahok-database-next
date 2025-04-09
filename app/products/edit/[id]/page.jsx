"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Toast from "@/components/Toast";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState({
    name: "",
    purchasePrice: "",
    sellPrice: "",
  });
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product data.");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setToast({ show: true, message: "Error loading product data." });
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to update product.");
      setToast({ show: true, message: "Product updated successfully." });

      setTimeout(() => {
        setToast({ show: false, message: "" });
        router.push("/products/all");
      }, 2000);
    } catch (err) {
      setToast({ show: true, message: "Error updating product." });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Purchase Price</label>
          <input
            type="number"
            name="purchasePrice"
            value={product.purchasePrice}
            min={0}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Sell Price</label>
          <input
            type="number"
            name="sellPrice"
            value={product.sellPrice}
            min={0}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => router.push("/products/all")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>

      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}
