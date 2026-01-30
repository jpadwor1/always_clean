export default async (request: Request) => {
  const ua = request.headers.get("user-agent") || "";

  if (
    ua.includes("AdsBot-Google") ||
    ua.includes("Google-Ads-Creatives-Assistant")
  ) {
    const headers = new Headers(request.headers);
    headers.set("X-Prerender-Force", "true");

    return fetch(request, { headers });
  }

  return fetch(request);
};
