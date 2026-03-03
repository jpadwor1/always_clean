"use server";

type QuotePayload = {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  notes?: string;
};

export async function sendQuoteNotification(payload: QuotePayload) {
  const apiKey = process.env.QUO_API_KEY;
  const from = process.env.QUO_FROM_NUMBER;
  const to = process.env.QUO_NOTIFY_TO;

  if (!apiKey || !from || !to) {
    throw new Error("Missing Quo environment variables.");
  }

  const recipients = to
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  const content = [
    "New Krystal Clean quote request",
    `Name: ${payload.fullName}`,
    `Address: ${payload.address}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.notes ? `Notes: ${payload.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const body: Record<string, unknown> = {
    content,
    from,
    to: recipients,
  };

  const response = await fetch("https://api.openphone.com/v1/messages", {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Quo API error: ${response.status} ${errorText}`);
  }

  return { success: true };
}
