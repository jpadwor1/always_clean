import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const ua = request.headers.get("user-agent") || "";

  const isAdsBot =
    ua.includes("AdsBot-Google") ||
    ua.includes("Google-Ads-Creatives-Assistant");

  // If AdsBot is using HEAD (common for ad landing checks), return a clean 200
  // This ends the chain intentionally. Returning a Response ends routing. :contentReference[oaicite:3]{index=3}
  if (isAdsBot && request.method === "HEAD") {
    return new Response(null, { status: 200 });
  }

  // Otherwise, do normal handling (no recursion)
  return context.next();
};

export const config: Config = {
  path: "/*",
};
