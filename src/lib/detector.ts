export type Platform = "macos" | "windows" | "linux";

export function getUserPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;

  const userAgent = navigator.userAgent;
  const platform = navigator.platform ?? "";

  if (/mac/i.test(userAgent) || /mac/i.test(platform)) return "macos";
  if (/win/i.test(userAgent) || /win/i.test(platform)) return "windows";
  if (/linux/i.test(userAgent) || /linux/i.test(platform)) return "linux";

  return null;
}
