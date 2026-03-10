import { useContext, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import MainContext from "../context/MainContext";
import "./ChatWindow.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
import AuthContext from "../context/AuthContext";
import WelcomeMsg from "./WelcomeMsg";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loader6 from "./Loaders/Loader6"
import TranslateBox from "./TranslateBox";

import apiClient from "../config/apiClient";
export default function ChatWindow() {
  const { chatId } = useParams();
  const { reply } = useContext(MainContext);
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  const [isReplying, setIsReplying] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  //getting all messages
  const fetchMsg = async () => {
    setIsReplying(true);
    try {
      const res = await apiClient({
        method: "GET",
        url: `/api/chats/${chatId}`,
      });

      setAllMessages(res.data.messages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsReplying(false);
    }
  };

  useEffect(() => {
    fetchMsg();
  }, [authLoading, isAuthenticated, reply, chatId]);


  //scroll to bottom
  useEffect(() => {
    const messagesContainer = document.querySelector('.message-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [allMessages]);

  return (
    <div className="flex  bg-neutral-950 text-white h-[100vh]">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col m-8">
        <div className="message-container flex-1 overflow-y-auto pt-8 pb-4 pr-4 justify-center">
          {allMessages.length === 0 ? (
            <div className="flex flex-col h-full place-items-center place-content-center">
              <Loader6 />
              <WelcomeMsg />
            </div>
          ) : (

            <div className=" flex flex-col gap-4 pb-8">
              {allMessages.map((msg, idx) =>
                msg.role === "user" ? (
                  <div className="flex justify-end" key={idx}>
                    <p className="chat-msg user-msg">
                      {msg.content}
                    </p>
                  </div>
                ) : (
                  <div key={idx} className="chat-msg assistant-msg">

                    <div>
                      <Markdown rehypePlugins={[rehypeHighlight]}>
                        {msg.content}
                      </Markdown>

                      {msg.translation.text && (


                        <div className="chat-msg assistant-msg translated-msg">
                          <span className="text-sm text-gray-400">{msg.translation.lang.toUpperCase()}</span> - {msg.translation.text}
                        </div>

                      )}

                      <div className="mt-2 text-lg text-white">
                        <TranslateBox text={msg.content} messageId={msg._id} fetchMsg={fetchMsg} />
                      </div>

                    </div>

                  </div>
                ),
              )}

            </div>
          )}


        </div>
        <ChatInput isReplying={isReplying} />
      </div>
    </div>
  );
}
