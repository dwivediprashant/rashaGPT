export default function Notice({ msg, type = "error" }) {
  return (
    <div className="w-[100%]">
      <span className={type === "error" ? "text-red-500" : "text-green-500"}>{msg}</span>
    </div>
  );
}
