import { useState } from "react";
import { MainContext } from "./MainContext";
export default function MainContextProvider({children}) {
    
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [allChats, setAllChats] = useState([{}]);


    const vals = {
        prompt,
        setPrompt,
        reply,
        setReply,
        allChats,
        setAllChats,
    };
    return(
        <MainContext.Provider value={vals}>
            {children}
        </MainContext.Provider>
    )
}
