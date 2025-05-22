"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBullseye,
  FaDollarSign,
  FaHashtag,
  FaMagnifyingGlass,
  FaPencil,
  FaRotateRight,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { fetchProducts, deleteProduct } from "../actions";
import ConfirmDialog from "@/app/(routes)/entries/customer/add/components/ConfirmDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import inputDateFormat from "@/utils/inputDateFormat";
import firstDateOfCurrentMonth from "@/utils/firstDateOfCurrentMonth";
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

export default function AllProducts() {
  const router = useRouter();
  const pathname = usePathname();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [search, setSearch] = useState("");
  const confirmDialogRef = useRef();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const itemsPerPageParam = Number(searchParams.get("itemsPerPage")) || 20;
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageParam);
  const [isSpinning, setIsSpinning] = useState(false);
  const queryObj = new URLSearchParams({
    ...Object.fromEntries(searchParams.entries()),
    itemsPerPage: itemsPerPageParam,
    page: pageParam,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(`?${queryObj.toString()}`);
        const { products, pagination } = await response.json();
        const { totalProducts, totalPages } = pagination;
        setTotalProducts(totalProducts);
        setTotalPages(totalPages);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  function openConfirmDialog(productId) {
    setSelectedProductId(productId); // Store the selected product ID
    confirmDialogRef.current.open(); // Open the confirmation dialog
  }

  async function handleDelete() {
    try {
      const response = await deleteProduct(selectedProductId);
      const { deletedProduct } = await response.json();
      setProducts((prev) =>
        prev.filter((product) => product._id !== selectedProductId)
      );
      console.log("Product deleted successfully", deletedProduct);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-3xl font-bold">All Products:</h1>
        <form className="flex items-center gap-3 flex-wrap justify-end">
          <div className="flex items-center gap-3">
            <div className="w-full flex items-center gap-2 rounded border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition leading-none">
              <input
                type="search"
                name="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-1.5 focus:outline-none"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
              >
                <FaMagnifyingGlass />
              </button>
              <a href="/customers/all" className="p-1.5 bg-orange-300 rounded">
                <FaRotateRight
                  className={`${isSpinning && "animate-spin"} size-5`}
                  onClick={() => setIsSpinning(true)}
                />
              </a>
            </div>
            <div>
              <select
                name="itemsPerPage"
                id="itemsPerPage"
                className="p-2 border rounded text-center"
                value={itemsPerPage}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setItemsPerPage(value);
                  const newQuery = new URLSearchParams(
                    Object.fromEntries(searchParams.entries())
                  );
                  newQuery.set("itemsPerPage", value);
                  newQuery.set("page", 1);
                  router.push(`${pathname}?${newQuery.toString()}`, {
                    shallow: true,
                  });
                }}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={150}>150</option>
                <option value={200}>200</option>
              </select>
            </div>
          </div>
        </form>
      </div>
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
                <span>In Stock</span>
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
          {loading && (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
          {!loading && !products.length && (
            <tr>
              <td colSpan={6}>No Product Found</td>
            </tr>
          )}
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.purchasePrice}</td>
              <td>{product.inStock}</td>
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

      <div className="flex justify-between">
        <strong>{`Showing ${Math.min(
          totalProducts,
          itemsPerPageParam
        )} items of ${totalProducts || "Loading..."}`}</strong>
        <div className="flex gap-2 leading-none">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", 1);
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronsLeft />
          </button>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", Math.max(1, pageParam - 1));
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronLeft />
          </button>

          {[
            pageParam - 2,
            pageParam - 1,
            pageParam,
            pageParam + 1,
            pageParam + 2,
          ]
            .filter((page) => page > 0 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                type="button"
                className={`${
                  page === pageParam
                    ? "border-2 border-blue-600"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } p-2 rounded cursor-pointer`}
                onClick={() => {
                  const newQuery = new URLSearchParams(
                    Object.fromEntries(searchParams.entries())
                  );
                  newQuery.set("page", page);
                  router.push(`${pathname}?${newQuery.toString()}`, {
                    shallow: true,
                  });
                }}
              >
                {page}
              </button>
            ))}

          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", Math.min(totalPages, pageParam + 1));
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronRight />
          </button>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer text-white"
            onClick={() => {
              const newQuery = new URLSearchParams(
                Object.fromEntries(searchParams.entries())
              );
              newQuery.set("page", totalPages);
              router.push(`${pathname}?${newQuery.toString()}`, {
                shallow: true,
              });
            }}
          >
            <LuChevronsRight />
          </button>
        </div>
      </div>
      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}
