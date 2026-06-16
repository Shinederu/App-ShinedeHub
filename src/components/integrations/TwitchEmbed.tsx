import { useEffect, useState } from "react";

const TWITCH_SCRIPT_URL = "https://player.twitch.tv/js/embed/v1.js";

const TwitchEmbed = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const mountEmbed = () => {
      const container = document.getElementById("twitch-embed");
      if (!container || !window.Twitch) return;

      container.innerHTML = "";
      new window.Twitch.Embed("twitch-embed", {
        width: "100%",
        height: "100%",
        channel: "Shinederu",
        layout: "video",
        theme: "dark",
        parent: [window.location.hostname],
      });
    };

    if (window.Twitch) {
      mountEmbed();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${TWITCH_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", mountEmbed);
      return () => existingScript.removeEventListener("load", mountEmbed);
    }

    const script = document.createElement("script");
    script.src = TWITCH_SCRIPT_URL;
    script.async = true;
    script.addEventListener("load", mountEmbed);
    document.body.appendChild(script);

    return () => script.removeEventListener("load", mountEmbed);
  }, [isLoaded]);

  return (
    <div className="flex items-center justify-center">
      <div className="mt-5 mb-6 flex aspect-video w-full max-w-5xl items-center justify-center overflow-hidden rounded-lg border-4 border-[#6a11cb] bg-[#10101f]">
        {isLoaded ? (
          <div id="twitch-embed" className="h-full w-full" />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="rounded-md bg-[#6a11cb] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#7b2bd8]"
          >
            Charger le lecteur Twitch
          </button>
        )}
      </div>
    </div>
  );
};

export default TwitchEmbed;
