import apiClient from "../config/apiClient";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import Loader7 from "./Loaders/Loader7";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import MainContext from "../context/MainContext";
export default function VerifyOtp() {

  const { email, password, phoneNumber, userName } = useLocation().state || { email: "", password: "", phoneNumber: "", userName: "" };
  const { login, verifyOtp } = useContext(AuthContext);
  const { showNotice } = useContext(MainContext);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const navigateToNewChat = async () => {

    try {
      const res = await apiClient({
        method: "POST",
        url: "/api/chats",
      });
      const chatId = res.data.savedChat._id;
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.log(error);
      showNotice({ msg: "Failed to create chat", type: "error" });
      throw error;
    }
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      const res = await verifyOtp({
        otp: enteredOtp
      });

      console.log(res)
      if (res.success) {
        await navigateToNewChat();
      } else {
        showNotice({ msg: "OTP verification failed", type: "error" });
      }

    } catch (error) {
      const backendError =
        error?.response?.data?.error || error?.response?.data?.msg;
      showNotice({ msg: backendError, type: "error" });

    } finally {
      setIsLoading(false);
      setEnteredOtp("");
    }
  }


  //resend otp
  const resendOtp = async ({ email, password, phoneNumber }) => {
    if (!email || !phoneNumber || !password) {
      showNotice({ msg: "Required fields are missing. Please login with valid credentials again!", type: "error" });
      return;
    }

    try {
      const res = await login({ email, password, phoneNumber });

      if (res.data?.success) {
        showNotice({ msg: "OTP resent successfully!", type: "success" });

        setTimeout(() => showNotice({ msg: "", type: "" }), 3000);
      }
    } catch (error) {
      showNotice({ msg: "Failed to resend OTP", type: "error" });
    }
  };
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-5">
      <div className="w-full max-w-md rounded-3xl p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,1)]">

        <h2 className="text-2xl font-semibold text-center">
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-white/50">
          Enter the 6-digit code sent to your phone
        </p>


        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">

          <label className="block text-sm font-medium text-white">
            Enter OTP
            <input
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              placeholder="xxxxxx"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-2xl tracking-[0.5em] text-white placeholder-white/20 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
          >
            {isLoading ? <Loader7 /> : "Verify OTP"}
          </button>


        </form>

        <p className="text-center text-sm text-white/50">
          Didn’t receive the code?{" "}
          <button
            disabled={isLoading}
            onClick={async () => {
              try {
                await resendOtp({ email, password, phoneNumber });
              } catch (error) {
                console.log(error);
              }
            }}
            type="button"
            className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-white hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </section>
  )
}
