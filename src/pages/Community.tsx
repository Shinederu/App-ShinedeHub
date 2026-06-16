import Title from "@/components/decoration/Title";
import { useState } from "react";

const COMMUNITY_TIPS = [
  "Suivre les annonces de lives et de projets.",
  "Partager des idées pas trop raisonnables, donc forcément intéressantes.",
  "Passer pour une soirée chill, un clip, une discussion ou juste dire coucou.",
];

const Community = () => {
  const [discordLoaded, setDiscordLoaded] = useState(false);

  return (
    <>
      <section className="mb-8 flex w-full justify-center border-b-4 border-[#6b6b6b] pb-8">
        <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-5 lg:grid-cols-2">
          <div className="flex justify-center">
            <div className="flex h-[500px] w-full max-w-[340px] items-center justify-center rounded-lg border-2 border-[#6a11cb] bg-[#10101f] p-4">
              {discordLoaded ? (
                <iframe
                  src="https://discord.com/widget?id=539000723023724545&theme=dark"
                  width="340"
                  height="500"
                  className="h-full w-full rounded-md"
                  title="Widget Discord"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setDiscordLoaded(true)}
                  className="rounded-md bg-[#5865f2] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#6b76f5]"
                >
                  Charger le widget Discord
                </button>
              )}
            </div>
          </div>

          <div className="rounded-lg border-2 border-[#6a11cb] bg-[#10101f] p-5 text-white animate-fadeInUp sm:p-6">
            <Title size={2} title="Rejoins la Communauté" level={1} />
            <p className="mb-4">
              Le serveur Discord reste le meilleur endroit pour suivre les nouvelles, discuter de jeux, de tech, de projets, ou simplement passer
              quand l'ambiance est tranquille.
            </p>
            <ul className="mb-4 grid gap-2 text-left text-sm text-[#bbbbbb]">
              {COMMUNITY_TIPS.map((tip) => (
                <li key={tip}>- {tip}</li>
              ))}
            </ul>
            <div className="flex justify-center">
              <a
                href={import.meta.env.VITE_DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-5 py-3 font-bold transition-colors duration-200 hover:from-[#7b2bd8] hover:to-[#3d86ff]"
              >
                Rejoindre le Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center">
        <div className="w-full max-w-5xl rounded-lg border-2 border-[#ffed46a6] bg-[#10101f] p-5 animate-fadeInUp sm:p-6">
          <Title title="Et après ?" size={2} />
          <p>
            Cette page peut devenir un petit point d'entrée pour la communauté: projets en cours, idées à tester, liens utiles et moments à ne pas
            rater quand quelque chose bouge.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Pour l'instant, Discord reste le plus simple. Et si une bonne idée arrive, elle aura sûrement sa place ici plus tard.
          </p>
        </div>
      </section>
    </>
  );
};

export default Community;
