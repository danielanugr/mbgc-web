import {
  buildSiteUrl,
  getSyncSecretFromRequest,
  isAuthorizedSyncRequest,
} from "@/lib/sync-bgg";

describe("sync-bgg helpers", () => {
  it("reads sync secret from custom header", () => {
    const request = new Request("https://example.com/api/sync-bgg", {
      headers: {
        "x-sync-secret": "super-secret",
      },
    });

    expect(getSyncSecretFromRequest(request)).toBe("super-secret");
  });

  it("accepts bearer authorization as fallback", () => {
    const request = new Request("https://example.com/api/sync-bgg", {
      headers: {
        authorization: "Bearer super-secret",
      },
    });

    expect(isAuthorizedSyncRequest(request, "super-secret")).toBe(true);
  });

  it("builds a normalized site URL", () => {
    expect(buildSiteUrl("https://mbgc.netlify.app/", "/api/sync-bgg")).toBe(
      "https://mbgc.netlify.app/api/sync-bgg",
    );
  });
});
