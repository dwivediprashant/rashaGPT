import "./Sidebar.css";
import Chat from "./Chat.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context.js";
import apiClient from "../config/apiClient";
export default function Sidebar() {
  const { allChats, setAllChats } = useContext(MyContext);
  const navigate = useNavigate();
  const redirectToNewChat = async () => {
    const res = await apiClient({
      method: "POST",
      baseURL: BASE_URL,
      url: "/api/chats",
      withCredentials: true,
    });
    const savedChat = res.data.savedChat;
    setAllChats((prev) => [savedChat, ...prev]);
    navigate(`/chat/${savedChat._id}`);
  };

  useEffect(() => {
    const fetchChats = async () => {
      const res = await apiClient({
        method: "GET",
        url: "/api/chats/",
      });
      // console.log(res.data.allChats);
      setAllChats(res.data.allChats);
    };
    fetchChats();
  }, []);

  return (
    <div>
      <div className="sidebar-chats p-4 w-[250px] text-white">
        <button
          onClick={redirectToNewChat}
          className="new-chat flex whitespace-nowrap items-center gap-2 px-8 py-2 m-4  font-semibold text-white rounded"
        >
          New Chat <i className="fa-solid fa-plus"></i>
        </button>
        <div className="m-3 ">
          <p className="text-gray-500">My Chats</p>
        </div>
        <ul className="all-chat-list pb-20">
          {allChats.map((chat, idx) => (
            <Chat chat={chat} key={idx} redirectToNewChat={redirectToNewChat} />
          ))}
          <div className="text-center p-3 claim-msg text-xs">
            © 2026 rasha-GPT. All rights reserved.
          </div>
        </ul>
      </div>
    </div>
  );
}
