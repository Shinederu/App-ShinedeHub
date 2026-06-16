const InfoCards = () => {
  return (
    <div className="mb-6 inline-block w-full border-b-4 border-[#6b6b6b] pb-8">
      <div className="grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-start rounded-lg border-2 border-[#6a11cb] bg-[#10101f] p-5 animate-fadeInUp sm:p-6">
          <div>
            <h2 className="mb-2 flex items-center gap-2 border-b-2 border-[#6a11cb] pb-1 text-xl font-bold">
              Les directs
              <span className="inline-flex h-3 w-3 rounded-full bg-[#20c70e] animate-pulse" />
            </h2>
            <p className="leading-relaxed text-[#f0f0f0]">
              Il arrive encore que je lance un stream sur Twitch, sans planning fixe et sans grosse annonce. Ce n'est plus mon activité principale,
              mais ça peut toujours poper pour une soirée chill.
            </p>
          </div>
          <div className="flex w-full justify-center">
            <a
              href={import.meta.env.VITE_TWITCH_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-md bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-5 py-3 font-bold transition-colors duration-200 hover:from-[#7b2bd8] hover:to-[#3d86ff]"
            >
              Rejoindre Twitch
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start rounded-lg border-2 border-[#cb1111] bg-[#10101f] p-5 animate-fadeInUp sm:p-6">
          <div>
            <h2 className="mb-2 border-b-2 border-[#cb1111] pb-1 text-xl font-bold">Les rediffusions</h2>
            <p className="leading-relaxed text-[#f0f0f0]">
              YouTube garde les rediffusions et quelques traces des moments passés. Parfait pour rattraper un live ou juste retomber sur une session
              qui avait bien tourné.
            </p>
          </div>
          <div className="flex w-full justify-center">
            <a
              href={import.meta.env.VITE_YOUTUBE_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-md bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-5 py-3 font-bold transition-colors duration-200 hover:from-[#7b2bd8] hover:to-[#3d86ff]"
            >
              Voir les rediffusions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
