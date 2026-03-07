
export default function SimpleNotice({ msg, type }) {
    return (
        <div>
            <span className={`${type === "error" ? "text-red-500" : type === "warning" ? "text-yellow-500" : "text-green-500"}`}>{msg}</span>
        </div>
    )
}
