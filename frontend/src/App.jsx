import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import ChatWindow from "./components/ChatWindow";
import { MyContext } from "./context/context";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/layouts/MainLayout";
function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [allChats, setAllChats] = useState([{}]);
  const provider = {
    prompt,
    setPrompt,
    reply,
    setReply,
    allChats,
    setAllChats,
  };
  return (
    <div>
      <MyContext.Provider value={provider}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<ChatWindow />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
