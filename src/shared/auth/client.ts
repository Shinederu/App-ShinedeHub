import { createAuthClient } from "@shinederu/auth-core";

const normalizeAuthBaseUrl = (baseUrl: string): string => {
  const trimmed = baseUrl.trim();
  if (!trimmed || /\/index\.php\/?$/i.test(trimmed)) return trimmed;

  return `${trimmed.replace(/\/+$/, "")}/index.php`;
};

export const authClient = createAuthClient({
  baseUrl: normalizeAuthBaseUrl(import.meta.env.VITE_SHINEDEHUB_API_AUTH_URL ?? import.meta.env.VITE_SHINEDERU_API_AUTH_URL ?? ""),
});
