import "./Notice.css";
export default function Notice({ msg, type = "error" }) {
  return (
    <div className="fixed top-6 right-6 animate-[slideIn_.3s_ease]">

      <div
        className={
          "flex items-center gap-3 backdrop-blur-md bg-white/80 shadow-xl rounded-xl px-4 py-3 border-l-4 " +
          (type === "success"
            ? "border-green-500"
            : type === "warning"
              ? "border-yellow-500"
              : "border-red-500")
        }
      >

        <i
          className={
            "fa-solid text-lg " +
            (type === "success"
              ? "fa-face-smile text-green-600"
              : type === "warning"
                ? "fa-face-meh text-yellow-600"
                : "fa-face-frown-open text-red-600")
          }
        ></i>

        <p className="text-sm text-gray-800">{msg}</p>

      </div>
    </div>
  );
}