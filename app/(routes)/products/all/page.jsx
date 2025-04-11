"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBullseye,
  FaDollarSign,
  FaEye,
  FaHashtag,
  FaPencil,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { fetchProducts, deleteProduct } from "./actions";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store the selected product ID
  const confirmDialogRef = useRef();

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

  function openConfirmDialog(productId) {
    setSelectedProductId(productId); // Store the selected product ID
    confirmDialogRef.current.open(); // Open the confirmation dialog
  }

  async function handleDelete() {
    try {
      await deleteProduct(selectedProductId); // Use the stored product ID
      setProducts((prev) =>
        prev.filter((product) => product._id !== selectedProductId)
      );
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-bold">All Products:</h1>
      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>ID</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaUser />
                <span>Name</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Purchase Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Sell Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaBullseye />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.purchasePrice}</td>
              <td>{product.sellPrice}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/products/edit/${product._id}`}
                    className="p-2 bg-green-600 text-white rounded-md"
                  >
                    <FaPencil />
                  </a>
                  <button
                    className="p-2 bg-red-600 text-white rounded-md cursor-pointer"
                    onClick={() => openConfirmDialog(product._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={handleDelete} // Call handleDelete only after confirmation
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}
