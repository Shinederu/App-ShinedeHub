import Title from "@/components/decoration/Title";
import { Code2, Gamepad2, HeartHandshake, Lightbulb, Music2, Sparkles, Twitch } from "lucide-react";

const highlights = [
  "CFC d'informaticien en poche",
  "Suisse, pseudo Shinederu depuis le ZEvent 2020",
  "Idées de projets à la con en stock permanent",
  "Streams rares, mais jamais totalement disparus",
];

const games = ["Genshin Impact", "Honkai", "Minecraft", "Vampire Survivors", "Vampire Crawler", "et les jeux qui passent par là"];
const references = ["Kaamelott", "Kaeloo", "Guzz Prod", "Wankil à l'ancienne", "sagas MP3", "YouTube, films d'animation et autres conneries"];

const About = () => {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 text-left">
      <section className="overflow-hidden rounded-lg border border-[#303030] bg-[#151515]">
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-300">À propos</p>
            <Title size={1} title="Salut, moi c'est Shinederu" />
            <div className="space-y-4 text-base leading-7 text-gray-200">
              <p>
                Moi c'est Shinederu, ou Théo pour les amis. Je suis un Suisse avec un CFC d'informaticien en poche, un humour parfois discutable,
                et une capacité assez solide à lancer des projets improbables juste parce que l'idée me fait rire.
              </p>
              <p>
                Je stream beaucoup moins qu'avant, mais l'envie n'est pas morte. Il y aura peut-être encore un live qui popera de nulle part un soir,
                sans planning, sans grande annonce, juste pour passer un moment tranquille.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-[#2f2f2f] bg-[#101010] p-4">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-md bg-[#1d1d1d] px-3 py-2 text-sm text-gray-200">
                <Sparkles className="mt-0.5 shrink-0 text-cyan-300" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-[#303030] bg-[#151515] p-5">
          <div className="mb-3 flex items-center gap-2 text-green-300">
            <Lightbulb size={20} />
            <Title size={4} title="Le pseudo" />
          </div>
          <p className="leading-7 text-gray-200">
            Shinederu vient d'une réponse foireuse entendue pendant le Quiz du Grenier au ZEvent 2020, autour de Splinter en japonais. Le son
            était moche mais stylé, alors c'est resté, avec une petite retouche.
          </p>
        </article>

        <article className="rounded-lg border border-[#303030] bg-[#151515] p-5">
          <div className="mb-3 flex items-center gap-2 text-amber-300">
            <HeartHandshake size={20} />
            <Title size={4} title="La vibe" />
          </div>
          <p className="leading-7 text-gray-200">
            Pas prise de tête. Des soirées chill, des blagues nulles, parfois un peu de timidité selon le contexte, et souvent une idée bizarre
            qui finit en prototype parce que "pourquoi pas".
          </p>
        </article>

        <article className="rounded-lg border border-[#303030] bg-[#151515] p-5">
          <div className="mb-3 flex items-center gap-2 text-rose-300">
            <Twitch size={20} />
            <Title size={4} title="Les lives" />
          </div>
          <p className="leading-7 text-gray-200">
            Le stream n'est plus le centre de tout. S'il revient, ce sera probablement comme avant: un live qui apparaît sans prévenir, pour jouer,
            discuter, et garder un souvenir d'une bonne session.
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <article className="rounded-lg border border-[#303030] bg-[#151515] p-5">
          <div className="mb-3 flex items-center gap-2 text-sky-300">
            <Code2 size={20} />
            <Title size={3} title="Les projets" />
          </div>
          <div className="space-y-4 leading-7 text-gray-200">
            <p>
              Le vibe coding n'a rien arrangé: les idées continuent d'arriver, souvent trop vite, souvent trop bêtes, parfois vraiment utiles.
              C'est un peu le moteur de tout l'écosystème Shinede.
            </p>
            <p>
              MelodyQuest a une place spéciale. L'idée date de ma première année d'apprentissage: une version Java dans un CMD, des fichiers
              en <span className="rounded bg-[#252525] px-1.5 py-0.5 text-sm text-gray-100">.wav</span>, et un
              <span className="rounded bg-[#252525] px-1.5 py-0.5 text-sm text-gray-100"> start.bat </span>
              pour lancer le bazar. Aujourd'hui c'est devenu un vrai projet web, mais l'ADN est resté le même.
            </p>
          </div>
        </article>

        <article className="rounded-lg border border-[#303030] bg-[#151515] p-5">
          <div className="mb-3 flex items-center gap-2 text-violet-300">
            <Gamepad2 size={20} />
            <Title size={3} title="Jeux du moment" />
          </div>
          <div className="flex flex-wrap gap-2">
            {games.map((game) => (
              <span key={game} className="rounded-md border border-[#333] bg-[#202020] px-3 py-2 text-sm text-gray-100">
                {game}
              </span>
            ))}
          </div>
          <p className="mt-4 leading-7 text-gray-200">
            Genshin reste tout en haut de la pile, Honkai n'est pas loin, Minecraft revient de temps en temps, et il y a toujours un jeu random
            qui s'invite dans la rotation.
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <article className="rounded-lg border border-[#303030] bg-[#151515] p-5">
          <div className="mb-3 flex items-center gap-2 text-teal-300">
            <Music2 size={20} />
            <Title size={3} title="References" />
          </div>
          <div className="flex flex-wrap gap-2">
            {references.map((item) => (
              <span key={item} className="rounded-md bg-[#202020] px-3 py-2 text-sm text-gray-100">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-[#303030] bg-[#151515] p-5">
          <Title size={3} title="Pourquoi rester ?" />
          <p className="leading-7 text-gray-200">
            Pour les idées à la con, les soirées chill, les projets qui sortent de nulle part, les discussions sans pression, et cette ambiance
            où on peut juste passer un bon moment sans faire semblant d'être plus sérieux que nécessaire.
          </p>
          <p className="mt-4 leading-7 text-gray-400">
            En gros: rien de révolutionnaire, mais c'est assumé. Et parfois, c'est exactement ce qu'il faut.
          </p>
        </article>
      </section>
    </div>
  );
};

export default About;
