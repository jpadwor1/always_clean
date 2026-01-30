export default async (request: Request) => {
  const ua = request.headers.get("user-agent") || "";

  // Prevent infinite loop
  if (request.headers.get("x-prerender-checked") === "true") {
    return fetch(request);
  }

  if (
    ua.includes("AdsBot-Google") ||
    ua.includes("Google-Ads-Creatives-Assistant")
  ) {
    const headers = new Headers(request.headers);
    headers.set("X-Prerender-Force", "true");
    headers.set("x-prerender-checked", "true");

    return fetch(new Request(request, { headers }));
  }

  return fetch(request);
};
