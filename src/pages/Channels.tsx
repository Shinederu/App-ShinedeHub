import Title from "@/components/decoration/Title";
import TwitchEmbed from "@/components/integrations/TwitchEmbed";
import YouTubeEmbed from "@/components/integrations/YouTubeEmbed";

const TWITCH_HINTS = [
  "Pas de planning fixe, donc les notifications restent le meilleur réflexe.",
  "Le Discord reste le meilleur canal pour les annonces.",
  "Un live peut encore poper sans prévenir, juste pour passer une bonne soirée.",
];

const Channels = () => {
  return (
    <>
      <section className="mb-6 inline-block w-full border-b-4 border-[#6b6b6b] pb-10">
        <Title title="Twitch" size={2} />
        <p>Les streams sont plus rares, mais s'il y en a un, tout se passe sur Twitch.</p>
        <TwitchEmbed />
        <div className="flex flex-col items-center rounded-lg border-2 border-[#6a11cb] bg-[#10101f] p-5 animate-fadeInUp sm:p-6">
          <p>
            Pas de planning fixe, pas de promesse compliquée: si un live apparaît, c'est surtout pour jouer, discuter et passer un moment tranquille.
          </p>
          <ul className="mt-3 grid gap-2 text-left text-sm text-[#bbbbbb]">
            {TWITCH_HINTS.map((hint) => (
              <li key={hint}>- {hint}</li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <a
              href={import.meta.env.VITE_TWITCH_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-md bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-5 py-3 font-bold transition-colors duration-200 hover:from-[#7b2bd8] hover:to-[#3d86ff]"
            >
              Voir la chaîne Twitch
            </a>
          </div>
        </div>
      </section>

      <section className="mb-4 inline-block w-full pb-6">
        <Title title="YouTube" size={2} />
        <p>Si tu as loupé un live ou une vidéo, YouTube garde les rediffusions disponibles.</p>
        <YouTubeEmbed />
        <div className="flex flex-col items-center rounded-lg border-2 border-[#cb1111] bg-[#10101f] p-5 animate-fadeInUp sm:p-6">
          <p>
            L'intégration affiche une prévisualisation légère ici. Le bouton ouvre directement la chaîne pour voir ce qui est disponible.
          </p>
          <div className="mt-4 text-center">
            <a
              href={import.meta.env.VITE_YOUTUBE_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-md bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-5 py-3 font-bold transition-colors duration-200 hover:from-[#7b2bd8] hover:to-[#3d86ff]"
            >
              Voir la chaîne YouTube
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Channels;
