"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createProduct from "@/features/products/actions/createProduct";
import { toast } from "sonner";

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const productData = Object.fromEntries(formData);

  const success = await createProduct(productData);

  if (success) {
    toast.success("Product created successfully");
    e.target.reset();
  } else {
    toast.error("Failed to create product");
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
        <Label htmlFor="name">Product Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="purchasePrice">Purchase Price</Label>
        <Input
          type="number"
          name="purchasePrice"
          id="purchasePrice"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="sellPrice">Sell Price</Label>
        <Input
          type="number"
          name="sellPrice"
          id="sellPrice"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="inStock">In Stock</Label>
        <Input
          type="number"
          name="inStock"
          id="inStock"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer disabled:opacity-50"
      >
        Add Product
      </Button>
    </form>
  );
}
