import { ModalContext } from "@/shared/context/ModalContext";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const MessageModal = () => {
  const modalCtx = useContext(ModalContext);

  const [color, setColor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [promptValue, setPromptValue] = useState<string>("");

  useEffect(() => {
    switch (modalCtx.type) {
      case "result":
        setTitle("Succès !");
        setColor("#20c70e");
        break;
      case "error":
        setTitle("Une erreur est survenue !");
        setColor("#b50909");
        break;
      case "confirm":
        setTitle("Confirmation");
        setColor("#ffe342");
        break;
      case "prompt":
        setTitle("Saisie requise");
        setColor("#3a7bd5");
        break;
      default:
        setTitle("Information");
        setColor("#ffe342");
        break;
    }

    setPromptValue("");
  }, [modalCtx.type, modalCtx.isOpen]);

  if (!modalCtx.isOpen) return null;

  const formatText = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-modal-title"
        aria-describedby="message-modal-body"
        className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-lg border bg-[#10101f] p-5 text-white shadow-lg sm:p-6"
        style={{ borderColor: color }}
      >
        <div className="mb-3 flex items-center justify-between gap-6 border-b pb-2" style={{ borderColor: color }}>
          <h2 id="message-modal-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Fermer la fenêtre"
            onClick={() => modalCtx.close()}
            className="rounded-md p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div id="message-modal-body" className="space-y-2 py-4">
          <p className="break-words text-gray-300">{formatText(modalCtx.message)}</p>
          {modalCtx.subMessage && <p className="break-words text-sm text-gray-400">{formatText(modalCtx.subMessage)}</p>}

          {modalCtx.type === "prompt" && (
            <input
              type="text"
              className="mt-2 w-full rounded-md border border-gray-600 bg-[#181828] px-3 py-2 text-white focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Ta réponse ici..."
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  modalCtx.close(promptValue.trim());
                }
              }}
            />
          )}
        </div>

        <div className="mt-4 flex justify-end gap-4">
          {modalCtx.type === "confirm" ? (
            <>
              <button
                type="button"
                onClick={() => modalCtx.close(false)}
                className="rounded-md bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
              >
                Non
              </button>
              <button
                type="button"
                onClick={() => modalCtx.close(true)}
                className="rounded-md px-4 py-2 font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Oui
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => (modalCtx.type === "prompt" ? modalCtx.close(promptValue.trim()) : modalCtx.close())}
              className="rounded-md px-4 py-2 font-semibold text-white shadow-md transition-opacity hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              Compris !
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
