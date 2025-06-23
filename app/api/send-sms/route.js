export async function POST(req) {
  const { mobileNumber, messageBody } = await req.json();

  const url = `https://panel.smsbangladesh.com/api?user=${encodeURIComponent(
    process.env.SMS_BANGLADESH_EMAIL
  )}&password=${encodeURIComponent(
    process.env.SMS_BANGLADESH_PASSWORD
  )}&to=88${encodeURIComponent(mobileNumber)}&text=${encodeURIComponent(messageBody)}`;

  const response = await fetch(url);

  const data = await response.json();
  const { success, message } = data;

  return new Response(
    JSON.stringify({
      success,
      message,
    }),
    {
      headers: { "Content-type": "application/json" },
    }
  );
}
