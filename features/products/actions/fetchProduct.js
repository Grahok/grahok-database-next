export async function fetchProduct(productId) {
  const response = await fetch(`/api/products/${productId}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("❌ Failed to fetch product");
  }

  return response;
}