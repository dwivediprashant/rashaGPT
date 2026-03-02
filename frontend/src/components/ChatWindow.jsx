import { useContext, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { MyContext } from "../context/context";
import "./ChatWindow.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
import axios from "axios";
import WelcomeMsg from "./WelcomeMsg";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loader6 from "./Loaders/Loader6";
import apiClient from "../config/apiClient";
export default function ChatWindow() {
  const { chatId } = useParams();
  const { reply } = useContext(MyContext);
  const [allMessages, setAllMessages] = useState([]);
  //getting all messages
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const res = await apiClient({
          method: "GET",
          url: `/api/chats/${chatId}`,
        });

        setAllMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMsg();
  }, [reply, chatId]);

  return (
    <div className="flex  bg-neutral-950 text-white chat-window">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col m-8">
        <div className="flex-1 overflow-y-auto pt-8 pb-32 pr-4 justify-center">
          {allMessages.length === 0 ? (
            <div className="flex flex-col h-full place-items-center place-content-center">
              <Loader6 />
              <WelcomeMsg />
            </div>
          ) : (
            <div className="flex flex-col gap-4 pb-8">
              {allMessages.map((msg, idx) =>
                msg.role === "user" ? (
                  <p key={idx} className="chat-msg user-msg">
                    {msg.content}
                  </p>
                ) : (
                  <div key={idx} className="chat-msg assistant-msg">
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                      {msg.content}
                    </Markdown>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
