"use server"

export async function getCustomers() {
  try {
    // Use the full URL to fetch the customers
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customers`);
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }
    const customers = await response.json();
    customers.reverse();
    return { success: true, customers };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { success: false, error: error.message };
  }
}
