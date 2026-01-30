export default async (request: Request, context: any) => {
  const ua = request.headers.get("user-agent") || "";

  const isAdsBot =
    ua.includes("AdsBot-Google") ||
    ua.includes("AdsBot-Google-Mobile") ||
    ua.includes("Google-Ads-Creatives-Assistant");

  // prevent re-applying if something downstream re-invokes the chain
  if (!isAdsBot || request.headers.get("x-adsbot-bypass") === "1") {
    return context.next();
  }

  // Ads checks often do HEAD first; let it pass cleanly
  if (request.method === "HEAD") {
    return new Response(null, { status: 200 });
  }

  // Rewrite UA to a normal browser UA so Prerender doesn't mis-handle AdsBot
  const headers = new Headers(request.headers);
  headers.set("x-adsbot-bypass", "1");
  headers.set(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  );

  return context.next(new Request(request, { headers }));
};
