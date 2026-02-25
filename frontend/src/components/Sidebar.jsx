import "./Sidebar.css";
import Chat from "./Chat.jsx";
import { Link } from "react-router";
export default function Sidebar() {
  return (
    <div>
      <div className="sidebar-chats p-4 max-w-[250px] shadow-xl/30 border-r border-solid] text-white">
        <Link
          to="/chat"
          className="inline-flex items-center gap-2 px-8 py-2 m-4 bg-red-800 font-semibold text-white rounded"
        >
          New Chat <i className="fa-solid fa-pen-to-square" />
        </Link>

        <ul>
          <Chat title="Chat 1" />
          <Chat title="Chat 1" />
          <Chat title="Chat 1" />
          <Chat title="Chat 1" />
        </ul>
      </div>
    </div>
  );
}
