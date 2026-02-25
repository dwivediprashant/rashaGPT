import "./Chat.css";

export default function Chat({ title = "Anonymous chat" }) {
  return <div className="chat p-4 border-b-1 border-black">{title}</div>;
}
