import { useNavigate } from "react-router";
import "./Home.css";
import Loader3 from "./Loaders/Loader3";
import apiClient from "../config/apiClient";
export default function Home() {
  const navigate = useNavigate();

  
  const handleClick = async () => {
    const res = await apiClient({
      method: "POST",
      url: "/api/chats",
    });
    const chatId = res.data.savedChat._id;
    navigate(`/chat/${chatId}`);
  };


  return (
    <div>
      <div className="main-img flex flex-col place-items-center place-content-center justify-items-center justify-content-center">
        <div className="m-4 min-w-[50vw]  place-items-center place-content-center min-h-[50vh]">
          <Loader3 />
        </div>

        <button
          onClick={handleClick}
          className="px-8 py-3 text-white  start-chat rounded-md"
        >
          Start chat
        </button>

        <div className="pt-6">
          <span className="text-white  text-[30px]">rasha-</span>
          <span className="text-white font-bold text-[30px]">GPT</span>
        </div>
      </div>
    </div>
  );
}
