import "./Chat.css";

export default function Chat({ chat }) {
  return (
    <div className="chat p-4 border-b-1 border-black  hover:bg-red-800">
      {chat.title}
    </div>
  );
}
