import { useNavigate } from "react-router";
import "./Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="navbar flex place-content-between pt-1">
        <div
          className="logo ml-8 text-2xl flex place-items-center"
          onClick={handleClick}
        >
          <span className="text-white">rasha-</span>
          <span className="text-white font-bold">GPT</span>
        </div>
        <div className="right-nav m-3">
          <a
            href="https://github.com/dwivediprashant/rashaGPT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github text-white text-xl mr-8"></i>
          </a>

          <i className="fa-solid fa-arrow-right-from-bracket text-white text-xl mr-8"></i>
        </div>
      </div>
    </>
  );
}
