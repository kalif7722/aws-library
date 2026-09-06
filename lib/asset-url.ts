/** Resolve shared EL10 assets from R2 when configured, otherwise use local paths. */
export function assetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.trim().replace(/\/$/, "");
  return base ? `${base}${path.startsWith("/") ? path : `/${path}`}` : path;
}
