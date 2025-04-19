"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getProduct, updateProduct } from "./actions";

export default function EditProduct({ params }) {
  const router = useRouter();
  const { productId } = React.use(params);
  const [product, setProduct] = useState();
  useEffect(() => {
    (async () => {
      const response = await getProduct(productId);
      try {
        const { product } = await response.json();
        setProduct(product);
      } catch (error) {
        console.error("Error fetching Product", error);
        setError("Error fetching product");
      } {/* finally {
        setLoading(false);
      } */}
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const productData = Object.fromEntries(formdata);
    try {
      const response = await updateProduct(productId, productData);
      if (response.ok) {
        router.push("/products/all");
      }
    } catch (error) {
      console.log("Error Updating Product", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="bg-white p-6 rounded-lg shadow space-y-6"
      aria-labelledby="product-section-title"
    >
      <h2 id="product-section-title" className="text-2xl font-semibold">
        Edit Product
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={product?.name}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="purchasePrice" className="text-sm">
          Purchase Price
        </label>
        <input
          type="number"
          name="purchasePrice"
          id="purchasePrice"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={product?.purchasePrice}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sellPrice" className="text-sm">
          Sell Price
        </label>
        <input
          type="number"
          name="sellPrice"
          id="sellPrice"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={product?.sellPrice}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="inStock" className="text-sm">
          In Stock
        </label>
        <input
          type="number"
          name="inStock"
          id="inStock"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          defaultValue={product?.inStock}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Update Product
      </button>
      {/* <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      /> */}
    </form>
  );
}
