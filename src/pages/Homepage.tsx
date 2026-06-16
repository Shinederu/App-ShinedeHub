import ActusCards from "@/components/cards/ActusCards";
import InfoCards from "@/components/cards/InfoCards";
import Title from "@/components/decoration/Title";
import { listPublicAnnouncements } from "@/shared/mainSite/client";
import { AnnouncementType } from "@/types/Announcement";
import { DateTimeFormatter } from "@/utils/DateTimeFormatter";
import { useEffect, useState } from "react";

const PAGE_SIZE = 4;

const Homepage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);

  useEffect(() => {
    const loadAnnouncements = async () => {
      const response = await listPublicAnnouncements();
      if (!response.ok || !response.data) return;

      setAnnouncements(response.data.announcements);
    };

    void loadAnnouncements();
  }, []);

  const totalPages = Math.max(1, Math.ceil(announcements.length / PAGE_SIZE));
  const pageStart = pageIndex * PAGE_SIZE;
  const visibleAnnouncements = announcements.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <>
      <section className="mb-8 rounded-xl border border-[#2f2f2f] bg-[#181818] p-5 sm:p-7 animate-fadeInUp">
        <Title title="Salutation jeune aventurier !" size={1} />
        <p>
          Bienvenue sur Shinederu.ch ! Ici tu trouveras mes projets, quelques nouvelles, la communauté, et les outils qui naissent quand une idée
          part un peu trop vite en prototype.
        </p>
      </section>

      <InfoCards />

      <section className="mb-4 inline-block w-full">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Title title="À la une" size={2} />
          {totalPages > 1 ? (
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded-md border border-[#3f3f3f] bg-[#121212] hover:bg-[#1c1c1c] transition"
                onClick={() => setPageIndex((prev) => (prev - 1 + totalPages) % totalPages)}
              >
                Précédent
              </button>
              <span className="text-sm text-gray-300">
                Page {pageIndex + 1}/{totalPages}
              </span>
              <button
                className="px-3 py-1 rounded-md border border-[#3f3f3f] bg-[#121212] hover:bg-[#1c1c1c] transition"
                onClick={() => setPageIndex((prev) => (prev + 1) % totalPages)}
              >
                Suivant
              </button>
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
          {visibleAnnouncements.map((announcement, index) => (
            <ActusCards
              key={announcement.id}
              title={announcement.title}
              message={announcement.message}
              date={DateTimeFormatter(announcement.publishedAt)}
              btnLabel={announcement.buttonLabel}
              link={announcement.buttonLink}
              highlighted={index === 0}
            />
          ))}
        </div>
        {announcements.length === 0 ? <p className="mt-4 text-gray-300">Aucune annonce à afficher en ce moment.</p> : null}
      </section>
    </>
  );
};

export default Homepage;
