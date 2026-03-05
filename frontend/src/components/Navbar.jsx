import { useNavigate } from "react-router";
import "./Navbar.css";
import { useState } from "react";
import ProfileModal from "./utils/profileModal";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router";
export default function Navbar() {

  const { isAuthenticated } = useContext(AuthContext);
  const [profileModal, setProfileModal] = useState(false);
  const navigate = useNavigate();


  const handleClick = () => {
    navigate("/");
  };



  // profile modal
  const handleProfileClick = () => {
    setProfileModal(!profileModal);
  }


  return (
    <div className="relative">
      <div className="navbar flex place-content-between pt-1">
        <div
          className="logo ml-8 text-2xl flex place-items-center"
          onClick={handleClick}
        >
          <span className="text-white">rasha-</span>
          <span className="text-white font-bold">GPT</span>
        </div>
        <div className="flex justify-start items-center m-3">
          <a
            href="https://github.com/dwivediprashant/rashaGPT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mr-8"
          >
            <i className="fa-brands fa-github text-white text-xl"></i> <span className="text-white text-sm ml-1  underline  hover:text-green-600">Documentation</span>
          </a>

          {!isAuthenticated && <Link to="/login" className="text-white mr-8 hover:text-green-600">
            <span>Login</span>
          </Link>}
          {isAuthenticated && <button className="profile-btn  mr-8" onClick={handleProfileClick}>
            <i className={`fa-solid fa-user text-lg hover:text-green-500 ${profileModal ? 'text-green-500' : "text-white"}`}></i>
          </button>}

        </div>
      </div>
      {isAuthenticated && profileModal && <ProfileModal />}
    </div>
  );
}
