import { useLocation, useNavigate } from "react-router";
import "./Chat.css";
import apiClient from "../config/apiClient";
import { useContext } from "react";
import MainContext from "../context/MainContext";
import { useState } from "react";
export default function Chat({ chat }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAllChats, showNotice } = useContext(MainContext);
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

  //delete chat
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    //confirmation to delete chat
    const confirmed = window.confirm(
      "Are you sure to delete this chat? Once you delete the char you can not recover it.",
    );
    if (!confirmed) return;

    try {
      const res = await apiClient({
        method: "DELETE",
        url: `/api/chats/${chat._id}`,
      });
      //confirmation of deleted chat
      showNotice({ msg: "Chat deleted successfully", type: "success" });
      setAllChats((prev) => prev.filter((c) => c._id !== chat._id));
    } catch (error) {
      console.log(error);
      showNotice({ msg: "Failed to delete chat", type: "error" });
    }
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const submitTitle = async (e) => {
    e.preventDefault();
    try {
      if (chatTitle.trim().length <= 0 || chatTitle.trim().length > 10) {
        showNotice({
          msg: "Chat title must be in between 1 and 10 characters",
          type: "warning",
        });
        return;
      }
      const res = await apiClient({
        method: "PATCH",
        url: `/api/chats/${chat._id}`,
        data: {
          title: chatTitle.trim(),
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
      showNotice({ msg: "Chat title updated successfully", type: "success" });
    } catch (error) {
      console.log(error);
      showNotice({ msg: "Failed to update chat title", type: "error" });
    }
  };

  return (
    <div
      className={`cursor-pointer py-3 px-2 mr-2 border-b-1 border-black ${location.pathname === `/chat/${chat._id}` ? "chat-path" : ""}`}
    >
      <div className="flex-col place-items-center place-content-between">
        <div className="flex px-4">
          <div onClick={handleClick} className="whitespace-nowrap mr-4">
            {chat.title}
          </div>

          <div className="flex justify-end">
            {location.pathname !== `/chat/${chat._id}` && (
              <div className="flex px-3 ml-2">
                <button onClick={handleDeleteClick} className="del-btn">
                  <i
                    className="fa-solid fa-trash text-white text-xs hover:text-red-600"
                    title="Delete chat"
                  ></i>
                </button>
              </div>
            )}
            <button onClick={handleEditClick} className="edit-btn">
              <i
                className="fa-solid fa-pen-to-square text-white text-sm hover:text-blue-600"
                title="Rename chat"
              ></i>
            </button>
          </div>
        </div>
        <div>
          {isOpen && (
            <div>
              <form
                className="flex flex-col w-[100%] text-center mt-2 justify-center items-center"
                onSubmit={submitTitle}
              >
                <input
                  type="text"
                  className="outline-none w-[90%] text-white px-1 border-1 rounded-md "
                  value={chatTitle}
                  onChange={(e) => setChatTitle(e.target.value)}
                />
                <button className="rounded-sm mb-2 bg-green-500 w-[50%]  mt-3 text-white">
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
