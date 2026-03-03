import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import NotFound from "./components/utils/NotFound";
function App() {
  
  return (
    <div>
    
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/chat/:chatId"
              element={<ProtectedRoute><ChatWindow /></ProtectedRoute>}
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
 
    </div>
  );
}

export default App;
