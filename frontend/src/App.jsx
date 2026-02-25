import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
