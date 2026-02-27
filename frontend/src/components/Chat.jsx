import { useLocation, useNavigate } from "react-router";
import "./Chat.css";
import axios from "axios";
export default function Chat({ chat }) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  //get all messages from particular chat
  const handleClick = async (e) => {
    const res = await axios({
      method: "GET",
      url: `http://localhost:8080/api/chats/${chat._id}`,
    });
    console.log(res.data.messages);
    navigate(`/chat/${chat._id}`);
  };
  return (
    <div
      className={
        location.pathname === `/chat/${chat._id}`
          ? `chat p-4 border-b-1 border-black bg-blue-600`
          : "chat p-4 border-b-1 border-black "
      }
      onClick={handleClick}
    >
      {chat.title}
    </div>
  );
}
