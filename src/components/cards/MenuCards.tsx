import { Link } from "react-router-dom";
import Title from "../decoration/Title";

type MenuCardsType = {
  active: boolean;
  url: string;
  name: string;
  picture: string;
  desc: string;
};

const DASHBOARD_IMAGES: Record<string, string> = {
  Ananas: "/img/dashboard/Ananas.png",
  Annonces: "/img/dashboard/Annonces.png",
  MelodyQuest: "/img/dashboard/MelodyQuest.png",
  Permission: "/img/dashboard/Permission.gif",
  Profile: "/img/dashboard/Profile.gif",
  ShinedeWake: "/img/dashboard/ShinedeWake.png",
  Utilisateurs: "/img/dashboard/Utilisateurs.png",
};

const resolveDashboardImage = (picture: string) => {
  if (picture.startsWith("/")) return picture;

  const key = picture.replace(/\.(avif|gif|jpg|jpeg|png|webp)$/i, "").trim();
  return DASHBOARD_IMAGES[key] ?? null;
};

const MenuCards = (props: MenuCardsType) => {
  const resolvedImage = resolveDashboardImage(props.picture);
  const isExternalUrl = /^https?:\/\//i.test(props.url);

  const cardContent = (
    <div
      className={`w-full aspect-square rounded-lg border-2 ${props.active ? "border-[#3eda30]" : "border-[#da3030]"} bg-[#222222] transition-colors duration-200 hover:border-indigo-300`}
      style={{
        backgroundImage: resolvedImage ? `url(${resolvedImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex h-full w-full flex-col justify-center rounded-md bg-black/65 px-4 py-5">
        <Title size={3} title={props.name} />
        <p>{props.desc}</p>
        {!props.active && <i>Prochainement...</i>}
      </div>
    </div>
  );

  if (!props.active) {
    return (
      <div className="block w-full" aria-disabled="true">
        {cardContent}
      </div>
    );
  }

  if (isExternalUrl) {
    return (
      <a href={props.url} className="block w-full">
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={props.url} className="block w-full">
      {cardContent}
    </Link>
  );
};

export default MenuCards;
