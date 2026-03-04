import { useState } from "react";
import { Link } from "react-router";
import apiClient from "../config/apiClient";
import Notice from "./utils/Notice";
import OtpSuccess from "./utils/OtpSuccess";
import Loader7 from "./Loaders/Loader7";
import { useNavigate } from "react-router";
export default function Register() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const handleFormSubmit = async (e) => {
    if (isLoading) {
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await apiClient({
        method: "POST",
        url: "/api/auth/signup",
        data: {
          name: userName.trim(),
          email: email.trim(),
          password,
          phoneNumber,
        },
      });
      console.log(res.data);
      if (res.data?.success === true) {

        navigate("/login");
      }
    } catch (error) {
      const backendError =
        error?.response?.data?.error || error?.response?.data?.msg;

      setErrorMsg(backendError);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex  min-h-screen items-center justify-center px-4 py-5">
      <div className="w-full  max-w-md rounded-3xl  p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,1)]">
        {errorMsg && <Notice msg={errorMsg} />}
        <form className="mt-8 space-y-3" onSubmit={handleFormSubmit}>
          <label className="block text-sm font-medium text-white">
            Username
            <input
              disabled={isLoading}
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              autoComplete="username"
              type="text"
              required
              placeholder="johndoe"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
            />
          </label>

          <label className="block text-sm font-medium text-white">
            Email
            <input
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none "
            />
          </label>

          <label className="block text-sm font-medium text-white">
            Phone Number
            <input
              disabled={isLoading}
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              autoComplete="username"
              type="text"
              required
              placeholder="johndoe"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
            />
          </label>

          <label className="block text-sm font-medium text-white">
            Password
            <input
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="new-password"
              type="password"
              required
              placeholder="xxxxxx"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition"
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
              Create account
            </button>
          )}

          <p className="mt-8 text-center text-sm text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-white hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
