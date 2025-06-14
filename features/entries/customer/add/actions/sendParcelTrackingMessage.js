export default async function sendParcelTrackingMessage(
  mobileNumber,
  shippingMethod,
  trackingLink
) {
  const response = await fetch("/api/send-parcel-tracking-message", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      mobileNumber: mobileNumber,
      shippingMethod: shippingMethod,
      trackingLink: trackingLink,
    }),
  });
  const { success, message } = await response.json();

  return { success, message };
}
