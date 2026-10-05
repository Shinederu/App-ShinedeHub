import ProjectCard from "@/components/cards/ProjectCard";
import Title from "@/components/decoration/Title";
import { PUBLIC_PROJECTS } from "@/data/projects";

const Projects = () => (
  <div className="mx-auto grid w-full max-w-5xl gap-6 sm:gap-8">
    <section className="text-left">
      <Title title="Mes projets" size={1} />
      <p className="max-w-3xl leading-relaxed text-gray-300">
        Du jeu entre amis aux outils du quotidien, retrouve ici les projets que je développe.
        Choisis celui qui t’intéresse et découvre ce qu’il propose.
      </p>
    </section>

    <ul className="grid gap-4 sm:gap-5" aria-label="Les projets de Shinederu">
      {PUBLIC_PROJECTS.map((project, index) => (
        <li key={project.id}>
          <ProjectCard project={project} index={index} />
        </li>
      ))}
    </ul>
    <p className="text-left text-sm leading-relaxed text-gray-400">
      Tu peux découvrir tous les projets ici sans te connecter. Certains outils restent réservés aux comptes autorisés.
    </p>
  </div>
);

export default Projects;
