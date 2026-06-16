const Footer = () => {
  const version = import.meta.env.VITE_SHINEDEHUB_VERSION ?? import.meta.env.VITE_SHINEDERU_VERSION ?? "dev";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-[#1a1a1a] py-5 text-center text-xs text-gray-400 sm:text-sm">
      <div>Version : {version}</div>
      <p>
        &copy; {currentYear}{" "}
        <a href="https://shinederu.ch" className="hover:underline">
          Shinederu.ch
        </a>{" "}
        - Tous droits réservés
      </p>
    </footer>
  );
};

export default Footer;
