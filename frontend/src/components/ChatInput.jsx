import { MainContext } from "../context/MainContext";
import { useContext, useEffect, useState } from "react";
import "./ChatInput.css";
import { useParams } from "react-router";
import apiClient from "../config/apiClient";
import ModelsModal from "./utils/ModelsModal";

export default function ChatInput() {
  const { chatId } = useParams();
  const { prompt, setPrompt, setReply } = useContext(MainContext);
  const [showModels, setShowModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem("selectedModel") || "llama-3.3-70b-versatile";
  });

  //local storage to save selected model
  useEffect(() => {
    localStorage.setItem("selectedModel", selectedModel);
  }, [selectedModel])

  ///------------
  const getReply = async (e) => {

    e.preventDefault();

    if (!prompt.trim()) return;


    try {
      const res = await apiClient({
        method: "POST",
        url: `/api/chats/${chatId}`,
        data: {
          message: prompt,
          model: selectedModel,
        },
      });
      setReply(res.data);
      setPrompt("");
    } catch (error) {
      console.log(error);
    }
  };


  //models option modal
  const handleShowModelCLick = (e) => {
    e.preventDefault();
    setShowModels(!showModels);
  }




  return (
    <div className="mb-16 flex justify-center items-center">


      <div className="flex flex-col justify-center items-center  sticky overflow-visible w-[60vw] place-content-center place-items-center bottom-3  bg-neutral-950 p-4 backdrop-blur rounded-2xl">

        <div className="flex-col items-center justify-center gap-3 w-[100%]">
          <>

            <form
              className="p-2 flex place-content-center place-items-center gap-3 w-[100%]"
              onSubmit={getReply}
            >
              <div className="relative bg-green-800">
                {showModels && <ModelsModal setSelectedModel={setSelectedModel} setShowModels={setShowModels} selectedModel={selectedModel} />}
              </div>
              <button type="button" onClick={handleShowModelCLick}>
                <i className="fa-solid fa-plus text-xl hover:text-gray-400"></i>
              </button>

              <div className="flex flex-col justify-center items-start w-[100%] ">
                <input
                  className="overflow-visible rounded-xl w-[100%]  bg-neutral-800 px-4 py-3 text-base text-white placeholder-white/40 shadow-inner focus:outline-none focus:ring-0"
                  placeholder="Message rasha-GPT"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />


              </div>
              <button
                type="submit"

              >
                <i className="fa-solid fa-paper-plane text-xl hover:text-gray-400"></i>
              </button>
            </form>
            <div className="text-xs text-center ml-16 flex rounded-4xl bg-neutral-800 mt-2  w-[max-content] pt-1 pb-1 pl-2 pr-2" title="Selected Model">
              {selectedModel}
            </div>
          </>
          <div className="text-center p-3 claim-msg text-xs">
            rasha-GPT can make mistakes. Please verify the given
            response.{" "}
          </div>
        </div>
      </div>
    </div>

  );
}
