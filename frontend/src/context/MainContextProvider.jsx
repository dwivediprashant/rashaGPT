import { useState } from "react";
import MainContext from "./MainContext";
import Notice from "../components/utils/Notice";
export default function MainContextProvider({ children }) {

    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [allChats, setAllChats] = useState([{}]);
    const [notice, setNotice] = useState({ msg: "", type: "" });

    const showNotice = ({ msg, type, duration = 5000 }) => {
        setNotice({ msg, type });
        setTimeout(() => {
            setNotice({ msg: "", type: "" });
        }, duration);
    };

    const vals = {
        prompt,
        setPrompt,
        reply,
        setReply,
        allChats,
        setAllChats,
        showNotice,
    };

    return (
        <MainContext.Provider value={vals}>
            {children}
            {notice.msg?.length > 0 &&
                <div className="fixed top-4 right-4 z-50">
                    <Notice msg={notice.msg} type={notice.type} />
                </div>
            }

        </MainContext.Provider >
    )
}
