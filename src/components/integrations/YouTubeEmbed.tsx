const YouTubeEmbed = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="mt-5 mb-6 aspect-video w-full max-w-5xl overflow-hidden rounded-lg border-4 border-[#cb1111]">
        <img
          src="/img/channels/YouTube.png"
          alt="Aperçu de la chaîne YouTube Shinederu"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
