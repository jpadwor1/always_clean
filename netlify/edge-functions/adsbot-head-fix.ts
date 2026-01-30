export default async (request: Request, context: any) => {
  const ua = request.headers.get("user-agent") || "";
  const isAdsBot =
    ua.includes("AdsBot-Google") ||
    ua.includes("Google-Ads-Creatives-Assistant");

  const url = new URL(request.url);

  // Fix: Ads review bots often use HEAD first
  if (isAdsBot && request.method === "HEAD") {
    return new Response(null, { status: 200 });
  }

  // Fix: Ensure AdsBot GET never gets a 404 by serving the SPA entry point
  if (isAdsBot && request.method === "GET") {
    // If they request "/" or any route, give them index.html
    url.pathname = "/index.html";
    return fetch(url.toString(), {
      headers: request.headers,
      method: "GET",
    });
  }

  return context.next();
};
