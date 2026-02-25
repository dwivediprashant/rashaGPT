import ChatInput from "./ChatInput";
import "./ChatWindow.css";
import Sidebar from "./Sidebar";

export default function ChatWindow() {
  return (
    <div className="flex h-screen bg-neutral-950 text-white chat-window">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col m-8">
        <div className="flex-1 overflow-y-auto p-8 ">
          {/* TODO: render chat history here */}
          <p>Welcome</p>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
