import MenuCards from "@/components/cards/MenuCards";
import Title from "@/components/decoration/Title";
import { AuthContext } from "@/shared/context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="grid gap-8">
      <div>
        <Title title="Tableau de bord" size={1} />
        <p className="text-gray-300">Retrouve ton profil et les outils de gestion auxquels tu as accès.</p>
      </div>
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
      </div>

      <div className="flex items-center flex-col justify-center gap-4 rounded-xl border border-[#2f2f2f] bg-[#181818] py-8 px-4">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Envie de découvrir mes projets ?</h2>
        <p className="text-gray-300">Ils ont maintenant leur propre page, accessible à tout le monde.</p>
        <Link to="/projects" className="rounded-md bg-linear-to-r/srgb from-[#6a11cb] to-[#2575fc] px-5 py-3 font-bold transition-colors hover:from-[#7b2bd8] hover:to-[#3d86ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300">
          Découvrir les projets
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
