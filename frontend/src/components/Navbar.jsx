import { useNavigate } from "react-router";
import "./Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="navbar flex place-content-between p-4">
        <div className="logo ml-8" onClick={handleClick}>
          <span className="text-white">rasha-</span>
          <span className="text-red-600 font-semibold">GPT</span>
        </div>
        <div className="login ">
          <i class="fa-solid fa-arrow-right-from-bracket text-white text-xl mr-8"></i>
        </div>
      </div>
    </>
  );
}
