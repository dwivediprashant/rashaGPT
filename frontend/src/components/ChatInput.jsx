import { MyContext } from "../context/context";
import { useContext } from "react";
import "./ChatInput.css";
import { useParams } from "react-router";
import axios from "axios";
export default function ChatInput() {
  const { chatId } = useParams();
  const { setIsLoading, prompt, setPrompt, setReply } = useContext(MyContext);
  const getReply = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios({
          method: "POST",
          url: `http://localhost:8080/api/chats/${chatId}`,
          data: {
            message: prompt,
          },
        });
        setReply(res.data);
        setPrompt("");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 100);
  };
  return (
    <div className="sticky overflow-visible w-[70vw] place-content-center place-items-center bottom-3 mr-12 bg-neutral-900/80 p-4 backdrop-blur rounded-2xl">
      <div className=" w-[100%] place-content-center">
        <form
          className="flex place-content-center gap-3 w-[100%]"
          onSubmit={getReply}
        >
          <input
            className="overflow-visible rounded-xl w-[100%]  bg-neutral-800 px-4 py-3 text-base text-white placeholder-white/40 shadow-inner focus:outline-none focus:ring-0"
            placeholder="Message rasha-GPT"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex h-12 w-12 items-center justify-center text-white transition hover:text-2xl"
          >
            <i className="fa-solid fa-paper-plane text-2xl"></i>
          </button>
        </form>
        <div className="text-center p-3 claim-msg text-xs">
          rasha-GPT can make mistakes. Please verify the given
          informations.{" "}
        </div>
      </div>
    </div>
  );
}
