import axios from "axios";
import recognizeLang from "./recognizeLang.js";

const getTranslate = async ({ text, selectedLangCode }) => {

    //first detect language
    const detectedLang = await recognizeLang(text);

    const res=await axios({
        method: "POST",
        url: "https://api.lingo.dev/process/localize",
        headers: {
        "X-API-Key": process.env.LINGO_DEV_API_KEY,
        "Content-Type": "application/json",
        },
        data: {
            sourceLocale: detectedLang.locale,
            targetLocale: selectedLangCode,
            data: {
                text
            },
        }
    })

    return res.data.data.text;
};

export default getTranslate;