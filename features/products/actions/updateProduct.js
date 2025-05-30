export default async function updateProduct(productId, productData) {
  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update product");
  }

  return response;
}
