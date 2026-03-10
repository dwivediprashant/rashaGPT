
import { useState } from "react";
import apiClient from "../config/apiClient";
import { useContext } from "react";
import MainContext from "../context/MainContext";
import Loader8 from "./Loaders/Loader8";

export default function TranslateBox({ text, messageId, fetchMsg, isLoading, setIsLoading }) {

    const { showNotice } = useContext(MainContext);
    const [selectedLangCode, setSelectedLangCode] = useState("");
    const [localIsLoading, setLocalIsLoading] = useState(false);

    const handleLangChange = (e) => {
        setSelectedLangCode(e.target.value);
    };


    //translate handler

    const handleTranslateClick = async () => {

        if (!selectedLangCode || selectedLangCode.length < 4) {//4 is minimum length for language code
            showNotice({ msg: "Please select a valid language code !", type: "warning" });
            return;
        }
        try {
            setIsLoading(true);
            setLocalIsLoading(true);
            const res = await apiClient({
                method: "POST",
                url: "/api/translate",
                data: {
                    text,
                    selectedLangCode,
                    messageId
                }
            })

            if (res.data.success === "ok") {
                showNotice({ msg: `Language translated successfully to ${res.data.translatedLang}`, type: "success" });
                fetchMsg();
                return;
            }

        } catch (error) {
            console.log(error)
            showNotice({ msg: "Translation failed", type: "error" });
        } finally {
            setIsLoading(false);
            setLocalIsLoading(false);
        }


    };

    // console.log(select.value);
    return (

        <div className="mt-1 flex items-center gap-1">
            <select
                className="bg-black border border-white/20 rounded px-1 py-0.5 text-xs text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                defaultValue=""
                onChange={handleLangChange}
                disabled={isLoading}
            >
                <option value="" disabled>Choose Language</option>
                <option value="en-US">English (US)</option>
                <option value="as-IN">Assamese (India)</option>
                <option value="bn-IN">Bangla (India)</option>
                <option value="bgc-IN">bgc (India)</option>
                <option value="bho-IN">Bhojpuri (India)</option>
                <option value="bo-IN">bo (India)</option>
                <option value="brx-IN">brx (India)</option>
                <option value="ccp-IN">ccp (India)</option>
                <option value="doi-IN">Dogri (India)</option>
                <option value="en-IO">English (British Indian Ocean Territory)</option>
                <option value="en-IN">English (India)</option>
                <option value="gu-IN">Gujarati (India)</option>
                <option value="hi-IN">Hindi (India)</option>
                <option value="hi-Latn-IN">Hindi (Latin, India)</option>
                <option value="kn-IN">Kannada (India)</option>
                <option value="kok-Deva-IN">Konkani (Devanagari, India)</option>
                <option value="kok-Latn-IN">Konkani (Latin, India)</option>
                <option value="ks-Arab-IN">ks (Arabic, India)</option>
                <option value="ks-Deva-IN">ks (Devanagari, India)</option>
                <option value="kxv-Deva-IN">kxv (Devanagari, India)</option>
                <option value="kxv-Latn-IN">kxv (Latin, India)</option>
                <option value="kxv-Orya-IN">kxv (Odia, India)</option>
                <option value="kxv-Telu-IN">kxv (Telugu, India)</option>
                <option value="mai-IN">Maithili (India)</option>
                <option value="ml-IN">Malayalam (India)</option>
                <option value="mni-Beng-IN">Manipuri (Bangla, India)</option>
                <option value="mni-Mtei-IN">Manipuri (Meitei Mayek, India)</option>
                <option value="mr-IN">Marathi (India)</option>
                <option value="ne-IN">Nepali (India)</option>
                <option value="or-IN">Odia (India)</option>
                <option value="pa-Guru-IN">Punjabi (Gurmukhi, India)</option>
                <option value="raj-IN">Rajasthani (India)</option>
                <option value="sa-IN">Sanskrit (India)</option>
                <option value="sat-Deva-IN">Santali (Devanagari, India)</option>
                <option value="sat-Olck-IN">Santali (Ol Chiki, India)</option>
                <option value="sd-Deva-IN">Sindhi (Devanagari, India)</option>
                <option value="ta-IN">Tamil (India)</option>
                <option value="te-IN">Telugu (India)</option>
                <option value="ur-IN">Urdu (India)</option>
                <option value="xnr-IN">Kangri (India)</option>
            </select>
            {localIsLoading ? isLoading ? <Loader8 /> : "" : <button
                className={`${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white px-2 py-0.5 rounded text-xs transition-colors`}
                onClick={handleTranslateClick}
                disabled={isLoading}
            >
                Translate
            </button>}
        </div>
    )
}