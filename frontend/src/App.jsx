import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ChatWindow from "./components/ChatWindow";
import { MyContext } from "./context/context";
import { useState } from "react";
function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const provider = {
    prompt,
    setPrompt,
    reply,
    setReply,
    isLoading,
    setIsLoading,
  };
  return (
    <div>
      <MyContext.Provider value={provider}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<ChatWindow />} />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
