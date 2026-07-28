import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Shinederu";
const SITE_URL = "https://shinederu.ch";
const DEFAULT_IMAGE = `${SITE_URL}/img/favicon/chibi.png`;
const DEFAULT_DESCRIPTION =
  "Shinederu est le portail public de Shinederu : projets, communaute, chaines Twitch et YouTube, annonces et dashboard personnel.";

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  robots?: string;
  structuredData?: unknown[];
};

const noIndex = "noindex, follow";

const routeSeo: Record<string, SeoConfig> = {
  "/": {
    title: "Shinederu - Portail public",
    description: DEFAULT_DESCRIPTION,
    path: "/",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "fr-CH",
      },
    ],
  },
  "/channels": {
    title: "Chaines Twitch et YouTube - Shinederu",
    description:
      "Retrouve les chaines Twitch et YouTube de Shinederu, les lives occasionnels, les videos et les projets partages avec la communaute.",
    path: "/channels",
  },
  "/community": {
    title: "Communaute Discord - Shinederu",
    description:
      "Rejoins la communaute Shinederu sur Discord pour suivre les projets, les annonces, les idees et les soirees chill.",
    path: "/community",
  },
  "/aboutme": {
    title: "A propos de Shinederu",
    description:
      "Decouvre Shinederu, son parcours d'informaticien, ses projets web, ses jeux du moment et l'ambiance de sa communaute.",
    path: "/aboutme",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Shinederu",
        url: `${SITE_URL}/aboutme`,
        description:
          "Informaticien suisse, createur de projets web personnels et de petites idees un peu trop ambitieuses pour rester dans un tiroir.",
      },
    ],
  },
  "/resetPassword": {
    title: "Reinitialiser le mot de passe - Shinederu",
    description: "Demande de reinitialisation de mot de passe Shinederu.",
    path: "/resetPassword",
    robots: noIndex,
  },
  "/newPassword": {
    title: "Nouveau mot de passe - Shinederu",
    description: "Choix d'un nouveau mot de passe Shinederu.",
    path: "/newPassword",
    robots: noIndex,
  },
  "/newEmail": {
    title: "Confirmation email - Shinederu",
    description: "Confirmation d'adresse email Shinederu.",
    path: "/newEmail",
    robots: noIndex,
  },
  "/dashboard": {
    title: "Dashboard - Shinederu",
    description: "Dashboard personnel Shinederu.",
    path: "/dashboard",
    robots: noIndex,
  },
  "/profile": {
    title: "Profil - Shinederu",
    description: "Gestion du profil Shinederu.",
    path: "/profile",
    robots: noIndex,
  },
  "/users": {
    title: "Gestion utilisateurs - Shinederu",
    description: "Panneau d'administration des utilisateurs Shinederu.",
    path: "/users",
    robots: noIndex,
  },
  "/announcements": {
    title: "Gestion annonces - Shinederu",
    description: "Panneau d'administration des annonces Shinederu.",
    path: "/announcements",
    robots: noIndex,
  },
  "/permissions": {
    title: "Permissions - Shinederu",
    description: "Gestion des permissions centralisees Shinederu.",
    path: "/permissions",
    robots: noIndex,
  },
  "/core-access": {
    title: "Permissions - Shinederu",
    description: "Redirection historique vers la gestion des permissions Shinederu.",
    path: "/core-access",
    robots: noIndex,
  },
};

const getSeoConfig = (pathname: string): SeoConfig => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return routeSeo[normalizedPath] ?? routeSeo["/"];
};

const upsertMeta = (
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.content = content;
};

const upsertCanonical = (href: string) => {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement("link");
    tag.rel = "canonical";
    document.head.appendChild(tag);
  }

  tag.href = href;
};

const upsertStructuredData = (data: unknown[] | undefined) => {
  const scriptId = "shinederu-route-structured-data";
  const existing = document.head.querySelector<HTMLScriptElement>(
    `script#${scriptId}`,
  );

  if (!data?.length) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data.length === 1 ? data[0] : data);

  if (!existing) {
    document.head.appendChild(script);
  }
};

const Seo = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoConfig(location.pathname);
    const canonical = `${SITE_URL}${seo.path}`;
    const robots = seo.robots ?? "index, follow";

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", DEFAULT_IMAGE);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertCanonical(canonical);
    upsertStructuredData(seo.structuredData);
  }, [location.pathname]);

  return null;
};

export default Seo;
