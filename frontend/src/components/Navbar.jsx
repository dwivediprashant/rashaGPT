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
        <div className="logo" onClick={handleClick}>
          <i className="fa-brands fa-openai text-[30px] text-white"></i>
        </div>
        <div className="user-profile">
          <i className="fa-solid fa-user text-[30px] text-white"></i>
        </div>
      </div>
    </>
  );
}
