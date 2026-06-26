const SYNC_SECRET_HEADER = "x-sync-secret";

export function getSyncSecretFromRequest(request: Request): string | null {
  const headerSecret = request.headers.get(SYNC_SECRET_HEADER);
  if (headerSecret) {
    return headerSecret;
  }

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  return null;
}

export function isAuthorizedSyncRequest(
  request: Request,
  expectedSecret: string | undefined,
): boolean {
  if (!expectedSecret) {
    return false;
  }

  return getSyncSecretFromRequest(request) === expectedSecret;
}

export function buildSiteUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
