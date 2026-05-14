import { useContext, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MainContext from "../context/MainContext";
import "./ChatWindow.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
import AuthContext from "../context/AuthContext";
import WelcomeMsg from "./WelcomeMsg";
//1st markdown typer :(not used for now)
import Markdown from "react-markdown";
//2nd : in use
import MarkdownTyper from "react-markdown-typer";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Loader6 from "./Loaders/Loader6";
import TranslateBox from "./TranslateBox";
import apiClient from "../config/apiClient";

export default function ChatWindow() {
  const { chatId } = useParams();
  const { reply, showNotice } = useContext(MainContext);
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  const [isReplying, setIsReplying] = useState(false);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedAssistantMessageId, setAnimatedAssistantMessageId] =
    useState(null);
  const hasMountedRef = useRef(false);

  //getting all messages
  const fetchMsg = async ({ animateLatestAssistant = false } = {}) => {
    setIsReplying(true);
    try {
      const res = await apiClient({
        method: "GET",
        url: `/api/chats/${chatId}`,
      });

      const messages = res.data.messages;
      setAllMessages(messages);

      if (animateLatestAssistant) {
        const latestAssistantMessageId = [...messages]
          .reverse()
          .find((message) => message.role === "assistant")?._id;
        setAnimatedAssistantMessageId(latestAssistantMessageId ?? null);
      } else {
        setAnimatedAssistantMessageId(null);
        setIsAssistantTyping(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsReplying(false);
    }
  };

  useEffect(() => {
    fetchMsg();
  }, [authLoading, isAuthenticated, chatId]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (!reply) return;

    fetchMsg({ animateLatestAssistant: true });
  }, [reply]);

  //scroll to bottom
  useEffect(() => {
    const messagesContainer = document.querySelector(".message-container");
    if (messagesContainer) {
      messagesContainer.scrollTo({
        behavior: "smooth",
        top: messagesContainer.scrollHeight,
      });
    }
  }, [allMessages]);

  //handleTranslationDeleteClick

  const handleTranslationDeleteClick = async ({ messageId }) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this translation? This can not be retrieved back.",
    );
    if (!isConfirm) return;

    try {
      const res = await apiClient({
        method: "PATCH",
        url: "api/translate",
        data: {
          messageId,
        },
      });

      if (res.data.success === "ok") {
        showNotice({
          msg: "Translation deleted successfully !",
          type: "success",
        });
        await fetchMsg();
      }
    } catch (error) {
      showNotice({ msg: "Translation deletion failed !", type: "error" });
      console.log(error);
    }
  };

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
                  <div className="flex justify-end" key={msg._id ?? idx}>
                    <p className="chat-msg user-msg">{msg.content}</p>
                  </div>
                ) : (
                  <div key={msg._id ?? idx} className="chat-msg assistant-msg">
                    <div>
                      {msg._id === animatedAssistantMessageId ? (
                        <MarkdownTyper
                          interval={3}
                          showCursor={true}
                          cursor={
                            <span className="typing-cursor" aria-hidden="true">
                              |
                            </span>
                          }
                          onStart={() => setIsAssistantTyping(true)}
                          onEnd={() => setIsAssistantTyping(false)}
                        >
                          {msg.content}
                        </MarkdownTyper>
                      ) : (
                        <Markdown rehypePlugins={[rehypeHighlight]}>
                          {msg.content}
                        </Markdown>
                      )}

                      {msg.translation.text && (
                        <div className="chat-msg assistant-msg translated-msg">
                          <span className="text-sm text-gray-400">
                            {msg.translation.lang.toUpperCase()}
                          </span>{" "}
                          - {msg.translation.text}
                          <button
                            className="text-white text-xs hover:text-red-600 cursor-pointer ms-auto"
                            onClick={(e) =>
                              handleTranslationDeleteClick({
                                messageId: msg._id,
                              })
                            }
                          >
                            {" "}
                            <i
                              className="fa-solid fa-trash "
                              title="Delete translation"
                            ></i>
                          </button>
                        </div>
                      )}

                      <div className="mt-2">
                        <TranslateBox
                          text={msg.content}
                          messageId={msg._id}
                          fetchMsg={fetchMsg}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
        <ChatInput
          isReplying={isReplying}
          isAssistantTyping={isAssistantTyping}
        />
      </div>
    </div>
  );
}
