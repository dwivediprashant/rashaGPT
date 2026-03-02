import { Link, useNavigate } from "react-router";
import "./Navbar.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
export default function Navbar() {

  const {isAuthenticated,logout}=useContext(AuthContext)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };


  const handleLogout=async()=>{
    await logout();
    navigate("/login");
  }

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
        <div className="flex justify-start  m-3">
          <a
            href="https://github.com/dwivediprashant/rashaGPT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github text-white text-xl mr-8"></i>
          </a>

          {/* <i className="fa-solid fa-arrow-right-from-bracket text-white text-xl mr-8"></i> */}
          {isAuthenticated ? <button onClick={handleLogout} className="text-white mr-8 hover:text-green-600">
            Logout{" "}
          </button>: <Link to="/login" className="text-white mr-8 hover:text-green-600">
            Login{" "}
          </Link>}
        </div>
      </div>
    </>
  );
}
