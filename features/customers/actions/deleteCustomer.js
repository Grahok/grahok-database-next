import { toast } from "sonner";

export default async function deleteCustomer(customerId) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    toast.success("Customer deleted successfully")
  }

  if (!response.ok) {
    toast.error("Failed to delete customer");
  }

  return response;
}
