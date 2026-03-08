import "./Sidebar.css";
import Chat from "./Chat.jsx";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import MainContext from "../context/MainContext.jsx";
import apiClient from "../config/apiClient";
export default function Sidebar() {

  const [searchQuery, setSearchQuery] = useState("");

  const { allChats, setAllChats } = useContext(MainContext);
  const navigate = useNavigate();

  const redirectToNewChat = async () => {
    const res = await apiClient({
      method: "POST",
      url: "/api/chats",
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
          <p className="text-gray-500">My Chats {`(${allChats.length})`}</p>
        </div>
        {/** Search filter functionality */}
        <div className="flex justify-start items-center  mb-4">
          <input
            type="text"
            placeholder="Search chats by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-neutral-800 text-sm  rounded-lg px-2 py-1 focus:outline-none focus:ring-0"
          />
          {/* <i className="fa-solid fa-magnifying-glass text-sm ml-1"></i> */}
        </div>

        <ul className="all-chat-list pb-20">
          {searchQuery ? allChats.filter((chat) => {
            return chat.title.toLowerCase().includes(searchQuery.toLowerCase());
          }).length === 0 ? (
            <div className="text-center p-3 text-gray-500 text-lg">
              <span>No chats found !</span><i className="fa-solid fa-face-meh fa-shake"></i>
            </div>
          ) : allChats.filter((chat) => {
            return chat.title.toLowerCase().includes(searchQuery.toLowerCase());
          }).map((chat, idx) => (
            <Chat chat={chat} key={idx} redirectToNewChat={redirectToNewChat} />
          )) : allChats.map((chat, idx) => (
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
