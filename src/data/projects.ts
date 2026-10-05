export type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  href?: string;
  access: "Sans compte" | "Accès réservé" | "Indisponible";
};

export const PUBLIC_PROJECTS: readonly Project[] = [
  {
    id: "melodyquest",
    name: "MelodyQuest",
    description:
      "Un blindtest musical à partager entre amis, directement dans le navigateur. Crée ou rejoins un salon sans compte pour reconnaître les morceaux et défier tes amis.",
    image: "/img/dashboard/MelodyQuest.png",
    href: "https://melodyquest.shinederu.ch/#/main",
    access: "Sans compte",
  },
  {
    id: "shinedebox",
    name: "ShinedeBox",
    description:
      "Un espace commun pour déposer et partager des fichiers. Les utilisateurs autorisés peuvent gérer la bibliothèque et créer des liens de téléchargement publics.",
    image: "/img/dashboard/ShinedeBox.gif",
    href: "https://box.shinederu.ch/",
    access: "Accès réservé",
  },
  {
    id: "shinedewake",
    name: "ShinedeWake",
    description:
      "Un outil pour réveiller tes ordinateurs à distance et consulter leur état. Les utilisateurs autorisés peuvent aussi suivre leurs ressources et demander un arrêt contrôlé.",
    image: "/img/dashboard/ShinedeWake.png",
    href: "https://wake.shinederu.ch/",
    access: "Accès réservé",
  },
  {
    id: "ananas",
    name: "Ananas",
    description:
      "Ananas est un projet de réseau social avec une bonne dose de #FUN. Il n’est pas accessible pour le moment.",
    image: "/img/dashboard/Ananas.png",
    access: "Indisponible",
  },
];
