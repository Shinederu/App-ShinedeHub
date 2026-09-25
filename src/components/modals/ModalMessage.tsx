import { ModalContext, type ModalContextType } from "@/shared/context/ModalContext";
import { X } from "lucide-react";
import { useContext, useState } from "react";

const modalPresentation: Record<ModalContextType["type"], { title: string; color: string }> = {
  result: { title: "Succès !", color: "#20c70e" },
  error: { title: "Une erreur est survenue !", color: "#b50909" },
  confirm: { title: "Confirmation", color: "#ffe342" },
  prompt: { title: "Saisie requise", color: "#3a7bd5" },
  info: { title: "Information", color: "#ffe342" },
};

const MessageModalContent = ({ modalCtx }: { modalCtx: ModalContextType }) => {
  const { title, color } = modalPresentation[modalCtx.type];
  const [promptValue, setPromptValue] = useState<string>("");

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

        <div id="message-modal-body" className="stack-y-2 py-4">
          <p className="wrap-break-word text-gray-300">{formatText(modalCtx.message)}</p>
          {modalCtx.subMessage && <p className="wrap-break-word text-sm text-gray-400">{formatText(modalCtx.subMessage)}</p>}

          {modalCtx.type === "prompt" && (
            <input
              type="text"
              className="mt-2 w-full rounded-md border border-gray-600 bg-[#181828] px-3 py-2 text-white focus:outline-hidden focus:ring-3 focus:border-blue-500"
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

const MessageModal = () => {
  const modalCtx = useContext(ModalContext);

  // Closing the modal unmounts its draft; changing its type starts a new one.
  return modalCtx.isOpen ? <MessageModalContent key={modalCtx.type} modalCtx={modalCtx} /> : null;
};

export default MessageModal;
