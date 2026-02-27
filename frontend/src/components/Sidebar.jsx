import "./Sidebar.css";
import Chat from "./Chat.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context.js";
export default function Sidebar() {
  const { allChats, setAllChats } = useContext(MyContext);
  const navigate = useNavigate();
  const handleClick = async () => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/chats",
    });
    const chatId = res.data.savedChat._id;
    navigate(`/chat/${chatId}`);
  };

  useEffect(() => {
    const fetchChats = async () => {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/api/chats/`,
      });
      // console.log(res.data.allChats);
      setAllChats(res.data.allChats);
    };
    fetchChats();
  }, []);
  return (
    <div>
      <div className="sidebar-chats p-4 max-w-[250px] text-white">
        <button
          onClick={handleClick}
          className="new-chat flex whitespace-nowrap items-center gap-2 px-8 py-2 m-4  font-semibold text-white rounded"
        >
          New Chat <i className="fa-solid fa-pen-to-square" />
        </button>
        <div className="m-3 ">
          <p className="text-gray-500">My Chats</p>
        </div>
        <ul className="all-chat-list pb-20">
          {allChats.map((chat, idx) => (
            <Chat chat={chat} key={idx} />
          ))}
          <div className="text-center p-3 claim-msg text-xs">
            © 2026 rasha-GPT. All rights reserved.
          </div>
        </ul>
      </div>
    </div>
  );
}
