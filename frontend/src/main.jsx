import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import MainContextProvider from "./context/MainContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <MainContextProvider>
    <App />
    </MainContextProvider>
  </AuthProvider>
  </BrowserRouter>,
);
