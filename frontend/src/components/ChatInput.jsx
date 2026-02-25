import "./ChatInput.css";

export default function ChatInput() {
  return (
    <div className="sticky bottom-8  bg-neutral-900/80 p-4 backdrop-blur rounded-2xl">
      <form className="flex items-end gap-3">
        <input
          className="flex-1 resize-none rounded-xl  bg-neutral-800 px-4 py-3 text-base text-white placeholder-white/40 shadow-inner focus:border-red-500 focus:outline-none"
          placeholder="Message rasha-GPT"
        />
        <button
          type="submit"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-500"
          aria-label="Send message"
        >
          <i className="fa-solid fa-arrow-up" />
        </button>
      </form>
      <div className="text-center p-3 claim-msg">
        rasha-GPT can not make mistakes{" "}
      </div>
    </div>
  );
}
