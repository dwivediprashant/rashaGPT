import { useContext } from "react";
import ChatInput from "./ChatInput";
import { MyContext } from "../context/context";
import "./ChatWindow.css";
import Sidebar from "./Sidebar";

export default function ChatWindow() {
  const { reply } = useContext(MyContext);
  return (
    <div className="flex h-screen bg-neutral-950 text-white chat-window">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col m-8">
        <div className="flex-1 overflow-y-auto p-8 ">
          {reply ? <p>{reply.response}</p> : ""}
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
