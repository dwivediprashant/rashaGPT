
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../config/apiClient";
import Error from "./utils/Error";
import Loader7 from "./Loaders/Loader7";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export default function Login() {
  const {isAuthenticated,login}=useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigateToNewChat = async () => {
    if(!isAuthenticated){
      navigate("/login")
    }
    const res = await apiClient({
      method: "POST",
      url: "/api/chats",
    });
    const chatId = res.data.savedChat._id;
    navigate(`/chat/${chatId}`);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
     await login({email:email.trim(),password}) 
      // after successfully login navigate to new chat
      await navigateToNewChat();
    } catch (error) {
      const backendError =
        error?.response?.data?.error || error?.response?.data?.msg;

      setErrorMsg(backendError);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl  p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,1)]">
        {errorMsg && <Error errorMsg={errorMsg} />}
        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
          <label className="block text-sm font-medium text-white/70">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="username"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-white/70">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
              placeholder="xxxxxx"
            />
          </label>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader7 />
            </div>
          ) : (
            <button
              disabled={isLoading}
              type="submit"
              className="flex justify-center w-full rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 mt-2"
            >
              Login
            </button>
          )}
        </form>

        <p className="mt-8 text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-white hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
