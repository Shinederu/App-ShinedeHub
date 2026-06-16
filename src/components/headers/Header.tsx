import { AuthContext } from "@/shared/context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import ModalLogin from "../modals/ModalLogin";
import ProfileHeader from "./ProfileHeader";

const links = [
  { label: "Accueil", to: "/" },
  { label: "Les Chaînes", to: "/channels" },
  { label: "Communauté", to: "/community" },
  { label: "À Propos", to: "/aboutme" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-base sm:text-lg transition-colors duration-300 ${
    isActive ? "text-indigo-300" : "text-white hover:text-[#8f6bff]"
  }`;

const Header = () => {
  const authCtx = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-4 text-center text-2xl font-semibold tracking-wider sm:p-5 sm:text-3xl">
        {authCtx.isLoggedIn === true ? (
          <Link to="/dashboard">
            Salutation <b>{authCtx.username}</b> !
          </Link>
        ) : (
          <Link to="/" className="font-bold">
            Shinederu.ch
          </Link>
        )}
      </div>

      <nav className="border-b border-[#262626] bg-[#1a1a1a] px-3 py-4 sm:px-6" aria-label="Navigation principale">
        <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-6">
          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-md bg-[#252525] px-3 py-2 text-sm font-semibold md:hidden"
          >
            {menuOpen ? "Fermer" : "Menu"}
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} end={link.to === "/"} className={navLinkClass} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="ml-auto">{authCtx.isLoggedIn ? <ProfileHeader /> : <ModalLogin />}</div>
        </div>

        <div
          id="mobile-navigation"
          className={`${menuOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 md:hidden`}
        >
          <div className="flex flex-col items-start gap-3 rounded-md bg-[#202020] p-4">
            {links.map((link) => (
              <NavLink key={link.to} end={link.to === "/"} className={navLinkClass} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
