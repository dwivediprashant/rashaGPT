import { useNavigate } from "react-router";
import "./Home.css";
import axios from "axios";
import Loader2 from "./Loaders/Loader2";
export default function Home() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/chats",
    });
    const chatId = res.data.savedChat._id;
    navigate(`/chat/${chatId}`);
    // console.log(chatId);
  };
  return (
    <div>
      <div className="main-img flex flex-col place-items-center place-content-center justify-items-center justify-content-center">
        <div className="m-4 min-w-[50vw]  place-items-center place-content-center min-h-[50vh]">
          <Loader2 />
        </div>

        <button
          onClick={handleClick}
          className="px-8 py-3 font-semibold text-black  bg-white rounded-md"
        >
          Start chat
        </button>

        <div className="pt-6">
          <span className="text-white  text-[30px]">rasha-</span>
          <span className="text-red-500 text-[30px]">GPT</span>
        </div>
      </div>
    </div>
  );
}
