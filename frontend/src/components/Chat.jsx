import { useLocation, useNavigate } from "react-router";
import "./Chat.css";
import apiClient from "../config/apiClient";
import { useContext } from "react";
import { MyContext } from "../context/context";
import { useState } from "react";
export default function Chat({ chat }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAllChats } = useContext(MyContext);
  const [chatTitle, setChatTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  //get all messages from particular chat
  const handleClick = async (e) => {
    const res = await apiClient({
      method: "GET",
      url: `/api/chats/${chat._id}`,
    });
    navigate(`/chat/${chat._id}`);
  };
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const res = await apiClient({
      method: "DELETE",
      url: `/api/chats/${chat._id}`,
    });
    setAllChats((prev) => prev.filter((c) => c._id !== chat._id));
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const submitTitle = async (e) => {
    e.preventDefault();
    try {
      if (chatTitle.length <= 1) {
      }
      const res = await apiClient({
        method: "PATCH",
        url: `/api/chats/${chat._id}`,
        data: {
          title: chatTitle.trim().length > 0 ? chatTitle.trim() : "New chat",
        },
      });
      const { updatedChat } = res.data;
      setAllChats((prev) =>
        prev.map((c) =>
          c._id === chat._id ? { ...c, title: updatedChat.title } : c,
        ),
      );
      setIsOpen(false);
      setChatTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`chat p-4 border-b-1 border-black ${location.pathname === `/chat/${chat._id}` ? "chat-path" : " "}`}
    >
      <div className="flex-col place-items-center place-content-between">
        <div className="flex px-4">
          <div onClick={handleClick} className="whitespace-nowrap">
            {chat.title}
          </div>

          {location.pathname !== `/chat/${chat._id}` && (
            <div className="flex px-3 ml-2">
              <button onClick={handleEditClick} className="edit-btn mr-2">
                <i
                  className="fa-solid fa-pen-to-square text-white text-sm hover:text-blue-600"
                  title="Rename chat"
                ></i>
              </button>
              <button onClick={handleDeleteClick} className="del-btn">
                <i
                  className="fa-solid fa-trash text-white text-xs hover:text-red-600"
                  title="Delete chat"
                ></i>
              </button>
            </div>
          )}
        </div>
        <div>
          {isOpen && (
            <div className="dropdown max-w-full">
              <form className="w-[100%] mt-2" onSubmit={submitTitle}>
                <input
                  type="text"
                  className="outline-none text-white px-1 border-1 rounded-md "
                  value={chatTitle}
                  maxLength={10}
                  onChange={(e) => setChatTitle(e.target.value)}
                />
                <button className="rounded-sm mb-2 bg-green-500 w-[50%] translate-x-[50%] mt-3 text-white">
                  save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
