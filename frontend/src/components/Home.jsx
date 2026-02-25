import { Link } from "react-router";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <div className="main-img flex flex-col place-items-center place-content-center justify-items-center justify-content-center">
        <img src="../../main-img.png" alt="main-img" className="p-4" />

        <Link
          to="/chat"
          className="px-8 py-3 font-semibold text-black  bg-white rounded-md"
        >
          Get Started
        </Link>
        <div className="pt-6">
          <span className="text-white  text-[30px]">rasha-</span>
          <span className="text-red-500 text-[30px]">GPT</span>
        </div>
      </div>
    </div>
  );
}
