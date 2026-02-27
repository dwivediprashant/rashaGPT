import { useContext, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { MyContext } from "../context/context";
import "./ChatWindow.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
import axios from "axios";
import Loader5 from "./Loaders/Loader5";
import WelcomeMsg from "./WelcomeMsg";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
export default function ChatWindow() {
  const { chatId } = useParams();
  console.log(chatId);
  const { reply } = useContext(MyContext);
  const [allMessages, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //getting all messages
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `http://localhost:8080/api/chats/${chatId}`,
        });

        setAllMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMsg();
  }, [reply, chatId]);

  return (
    <div className="flex h-screen bg-neutral-950 text-white chat-window">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col m-8">
        <div className="flex-1 overflow-y-auto p-8">
          {isLoading || allMessages.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center">
              <Loader5 />
              <WelcomeMsg />
            </div>
          ) : (
            <div className="flex flex-col gap-4 pb-8">
              {allMessages.map((msg, idx) =>
                msg.role === "user" ? (
                  <p key={idx} className="user-msg p-4 bg-green-600">
                    {msg.content}
                  </p>
                ) : (
                  <Markdown rehypePlugins={[rehypeHighlight]} key={idx}>
                    {msg.content}
                  </Markdown>
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
