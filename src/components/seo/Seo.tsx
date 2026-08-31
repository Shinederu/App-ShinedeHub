import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Shinederu";
const SITE_URL = "https://shinederu.ch";
const DEFAULT_IMAGE = `${SITE_URL}/img/favicon/chibi.png`;
const DEFAULT_IMAGE_ALT = "Avatar de Shinederu";
const DEFAULT_DESCRIPTION =
  "Découvre l'univers de Shinederu : projets web, streams sur Twitch, vidéos YouTube, communauté Discord et dernières nouvelles.";
const SOCIAL_PROFILES = [
  import.meta.env.VITE_TWITCH_CHANNEL_LINK,
  import.meta.env.VITE_YOUTUBE_CHANNEL_LINK,
].filter(Boolean);

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  robots?: string;
  ogType?: "profile" | "website";
  structuredData?: unknown[];
};

const noIndex = "noindex, follow";

const routeSeo: Record<string, SeoConfig> = {
  "/": {
    title: "Shinederu — Projets, streams et communauté",
    description: DEFAULT_DESCRIPTION,
    path: "/",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "fr-CH",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: `${SITE_URL}/aboutme`,
        sameAs: SOCIAL_PROFILES,
      },
    ],
  },
  "/channels": {
    title: "Twitch et YouTube — Shinederu",
    description:
      "Retrouve les streams de Shinederu sur Twitch et ses vidéos sur YouTube, avec les liens directs vers les deux chaînes.",
    path: "/channels",
  },
  "/community": {
    title: "Communauté Discord — Shinederu",
    description:
      "Rejoins la communauté Discord de Shinederu pour suivre les projets, les annonces, les lives et les prochaines soirées.",
    path: "/community",
  },
  "/aboutme": {
    title: "À propos — Shinederu",
    description:
      "Découvre Shinederu, informaticien suisse : son parcours, ses projets web, ses jeux du moment et l'origine de son pseudo.",
    path: "/aboutme",
    ogType: "profile",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/aboutme#profile`,
        url: `${SITE_URL}/aboutme`,
        name: "À propos de Shinederu",
        inLanguage: "fr-CH",
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: SITE_NAME,
          url: `${SITE_URL}/aboutme`,
          description: "Informaticien suisse et créateur de projets web personnels.",
          sameAs: SOCIAL_PROFILES,
        },
      },
    ],
  },
  "/resetPassword": {
    title: "Réinitialiser le mot de passe — Shinederu",
    description: "Demande de réinitialisation du mot de passe Shinederu.",
    path: "/resetPassword",
    robots: noIndex,
  },
  "/newPassword": {
    title: "Nouveau mot de passe — Shinederu",
    description: "Choisis un nouveau mot de passe pour ton compte Shinederu.",
    path: "/newPassword",
    robots: noIndex,
  },
  "/newEmail": {
    title: "Confirmation de l'adresse e-mail — Shinederu",
    description: "Confirme l'adresse e-mail de ton compte Shinederu.",
    path: "/newEmail",
    robots: noIndex,
  },
  "/dashboard": {
    title: "Tableau de bord — Shinederu",
    description: "Accède à ton tableau de bord Shinederu.",
    path: "/dashboard",
    robots: noIndex,
  },
  "/profile": {
    title: "Mon profil — Shinederu",
    description: "Gère ton profil Shinederu.",
    path: "/profile",
    robots: noIndex,
  },
  "/users": {
    title: "Gestion des utilisateurs — Shinederu",
    description: "Administration des utilisateurs Shinederu.",
    path: "/users",
    robots: noIndex,
  },
  "/announcements": {
    title: "Gestion des annonces — Shinederu",
    description: "Administration des annonces publiées sur Shinederu.",
    path: "/announcements",
    robots: noIndex,
  },
  "/permissions": {
    title: "Permissions — Shinederu",
    description: "Administration des permissions Shinederu.",
    path: "/permissions",
    robots: noIndex,
  },
  "/core-access": {
    title: "Permissions — Shinederu",
    description: "Administration des permissions Shinederu.",
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
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("name", "application-name", SITE_NAME);
    upsertMeta("name", "theme-color", "#6a11cb");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "fr_CH");
    upsertMeta("property", "og:type", seo.ogType ?? "website");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", DEFAULT_IMAGE);
    upsertMeta("property", "og:image:alt", DEFAULT_IMAGE_ALT);
    upsertMeta("property", "og:image:width", "1024");
    upsertMeta("property", "og:image:height", "1024");
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", DEFAULT_IMAGE);
    upsertMeta("name", "twitter:image:alt", DEFAULT_IMAGE_ALT);
    upsertCanonical(canonical);
    upsertStructuredData(seo.structuredData);
  }, [location.pathname]);

  return null;
};

export default Seo;
