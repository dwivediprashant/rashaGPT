import "./Sidebar.css";
import Chat from "./Chat.jsx";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../context/context.js";
export default function Sidebar() {
  const { allChats, setAllChats } = useContext(MyContext);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const handleClick = async () => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/chats",
    });
    const chatId = res.data.savedChat._id;
    navigate(`/chat/${chatId}`);
  };
  //whenever chatId changes get all chats
  useEffect(() => {
    const fetchChats = async () => {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/chats/`,
      });
      setAllChats(res.data.allChats);
      console.log(res.data.allChats);
    };
    fetchChats();
  }, [chatId]);
  return (
    <div>
      <div className="sidebar-chats p-4 max-w-[250px] shadow-xl/30 border-r border-solid] text-white">
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-8 py-2 m-4 bg-red-800 font-semibold text-white rounded"
        >
          New Chat <i className="fa-solid fa-pen-to-square" />
        </button>

        <ul className="all-chat-list">
          {allChats.map((chat, idx) => (
            <Chat chat={chat} key={idx} />
          ))}
        </ul>
      </div>
    </div>
  );
}
