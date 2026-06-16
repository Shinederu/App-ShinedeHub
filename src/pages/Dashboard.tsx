import MenuCards from "@/components/cards/MenuCards";
import { AuthContext } from "@/shared/context/AuthContext";
import { useContext } from "react";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <MenuCards active={true} name="Profil" desc="Consulte et modifie ton profil." url="/profile" picture="Profile" />
        {authCtx.can_manage_users ? (
          <MenuCards active={true} name="Utilisateurs" desc="Consulte les comptes et leurs accès." url="/users" picture="Utilisateurs" />
        ) : null}
        {authCtx.can_manage_announcements ? (
          <MenuCards active={true} name="Annonces" desc="Gère les annonces de l'accueil." url="/announcements" picture="Annonces" />
        ) : null}
        {authCtx.is_admin ? (
          <MenuCards active={true} name="Permissions" desc="Gère les projets et droits centralisés." url="/permissions" picture="Permission" />
        ) : null}
        <MenuCards active={true} name="MelodyQuest" desc="Un blindtest amusant !" url="https://melodyquest.shinederu.ch/#/main" picture="MelodyQuest" />
        {authCtx.can_access_box ? (
          <MenuCards active={true} name="ShinedeBox" desc="Héberge et partage tes fichiers." url="https://box.shinederu.ch/" picture="ShinedeBox" />
        ) : null}
        {authCtx.can_access_wake ? (
          <MenuCards active={true} name="ShinedeWake" desc="Réveille et gère tes machines à distance." url="https://wake.shinederu.ch/" picture="ShinedeWake" />
        ) : null}
        <MenuCards active={false} name="Ananas" desc="Le célèbre réseau social #FUN" url="/Ananas" picture="Ananas" />
      </div>

      <div className="flex items-center flex-col justify-center gap-4 rounded-xl border border-[#2f2f2f] bg-[#181818] py-8 px-4">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Prochainement ici, encore plus de projets !</h2>
        <p>
          <i>Vous verrez, ça va bientôt se remplir !</i>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
