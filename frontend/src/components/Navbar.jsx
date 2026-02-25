import "./Navbar.css";
import { Link } from "react-router";
export default function Navbar() {
  return (
    <>
      <div className="navbar flex place-content-between p-4">
        <div className="logo">
          <Link to="/">
            <i className="fa-brands fa-openai text-[30px] text-white"></i>
          </Link>
        </div>
        <div className="user-profile">
          <i className="fa-solid fa-user text-[30px] text-white"></i>
        </div>
      </div>
    </>
  );
}
