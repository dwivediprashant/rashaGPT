import { useLocation, useNavigate } from "react-router";
import "./Chat.css";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../context/context";
export default function Chat({ chat, redirectToNewChat }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAllChats } = useContext(MyContext);
  //get all messages from particular chat
  const handleClick = async (e) => {
    const res = await axios({
      method: "GET",
      url: `http://localhost:8080/api/chats/${chat._id}`,
    });
    navigate(`/chat/${chat._id}`);
  };
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/chats/${chat._id}`,
    });
    setAllChats((prev) => prev.filter((c) => c._id !== chat._id));
    redirectToNewChat();
  };

  return (
    <div
      className={`chat p-4 border-b-1 border-black ${location.pathname === `/chat/${chat._id}` ? "chat-path" : " "}`}
    >
      <div className="flex place-items-center place-content-between">
        <div onClick={handleClick}>{chat.title}</div>
        <button onClick={handleDeleteClick} className="del-btn">
          <i class="fa-solid fa-trash text-white text-xs hover:text-sm"></i>
        </button>
      </div>
    </div>
  );
}
