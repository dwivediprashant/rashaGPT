import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ChatWindow from "./components/ChatWindow";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<ChatWindow />} />
      </Routes>
    </div>
  );
}

export default App;
