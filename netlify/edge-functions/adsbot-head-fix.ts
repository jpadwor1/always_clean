export default async (request: Request, context: any) => {
  const ua = request.headers.get("user-agent") || "";
  const isAdsBot =
    ua.includes("AdsBot-Google") ||
    ua.includes("Google-Ads-Creatives-Assistant");

  // Prevent AdsBot HEAD checks from failing (common in ad review)
  if (isAdsBot && request.method === "HEAD") {
    return new Response(null, { status: 200 });
  }

  // Continue the request chain safely (no fetch recursion)
  return context.next();
};
