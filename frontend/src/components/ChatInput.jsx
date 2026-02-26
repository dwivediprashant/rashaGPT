import { MyContext } from "../context/context";
import { useContext } from "react";
import "./ChatInput.css";
import { useParams } from "react-router";
import axios from "axios";
export default function ChatInput() {
  const { chatId } = useParams();
  const { prompt, setPrompt, setReply } = useContext(MyContext);

  const getReply = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "POST",
      url: `http://localhost:8080/api/chats/${chatId}`,
      data: {
        message: prompt,
      },
    });
    console.log(res.data.response);
    setReply(res.data);
    setPrompt("");
  };
  return (
    <div className="sticky bottom-8  bg-neutral-900/80 p-4 backdrop-blur rounded-2xl">
      <form className="flex items-end gap-3" onSubmit={getReply}>
        <input
          className="flex-1 resize-none rounded-xl  bg-neutral-800 px-4 py-3 text-base text-white placeholder-white/40 shadow-inner focus:border-red-500 focus:outline-none"
          placeholder="Message rasha-GPT"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-500"
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
