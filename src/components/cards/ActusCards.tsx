import Title from "../decoration/Title";

type ActusProps = {
  title: string;
  message: string;
  btnLabel: string;
  link: string;
  date: string;
  highlighted?: boolean;
};

const ActusCards = ({ title, message, btnLabel, link, date, highlighted = false }: ActusProps) => {
  return (
    <div
      className={`grid min-h-[19rem] grid-rows-[auto_1fr_auto_auto] rounded-lg border-2 bg-[#10101f] px-5 pt-4 pb-4 transition-colors duration-200 sm:min-h-[22rem] sm:px-6 ${
        highlighted ? "border-[#5f9bff] shadow-[0_0_22px_rgba(37,117,252,0.35)]" : "border-[#3eda30]"
      }`}
    >
      <Title title={title} size={3} />

      <p className="text-white text-left overflow-auto">{message}</p>

      {link && btnLabel ? (
        <div className="flex justify-center self-end pb-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-4 py-2.5 font-bold transition-colors duration-200 hover:from-[#7b2bd8] hover:to-[#3d86ff]"
          >
            {btnLabel}
          </a>
        </div>
      ) : (
        <div className="self-end pb-4" />
      )}

      <p className="text-right text-sm text-gray-400">Publié le {date}</p>
    </div>
  );
};

export default ActusCards;
