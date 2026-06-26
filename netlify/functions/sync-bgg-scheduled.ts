import { buildSiteUrl } from "../../src/lib/sync-bgg";

export default async function syncBGGScheduled(request: Request) {
  const syncSecret = process.env.BGG_SYNC_SECRET;
  const siteUrl = process.env.URL;

  if (!syncSecret) {
    console.error("BGG scheduled sync skipped: missing BGG_SYNC_SECRET");
    return new Response(
      JSON.stringify({
        success: false,
        message: "Missing BGG_SYNC_SECRET",
      }),
      { status: 500 },
    );
  }

  if (!siteUrl) {
    console.error("BGG scheduled sync skipped: missing Netlify URL");
    return new Response(
      JSON.stringify({
        success: false,
        message: "Missing Netlify URL",
      }),
      { status: 500 },
    );
  }

  const payload = await request.json().catch(() => null);
  const endpoint = buildSiteUrl(siteUrl, "/api/sync-bgg");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-sync-secret": syncSecret,
      "user-agent": "MBGC-BGG-Cron/1.0",
    },
    body: JSON.stringify({
      source: "netlify-scheduled-function",
      next_run: payload?.next_run ?? null,
    }),
  });

  const body = await response.text();

  console.log("BGG scheduled sync completed", {
    status: response.status,
    endpoint,
    nextRun: payload?.next_run ?? null,
  });

  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
    },
  });
}

export const config = {
  schedule: "@weekly",
};
