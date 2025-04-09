const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchProducts() {
  const response = await fetch(`${baseUrl}/api/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // ensure fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function deleteProduct(productId) {
  const response = await fetch(`${baseUrl}/api/products`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: productId }), // 🔁 fixed key to _id
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}
