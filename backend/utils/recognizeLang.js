import axios from "axios";

const recognizeLang = async (text) => {
    const res=await axios({
        method: "POST",
        url: "https://api.lingo.dev/process/recognize",
        headers: {
            "X-API-Key": process.env.LINGO_DEV_API_KEY,
            "Content-Type": "application/json",
        },
        data: {
            text,
        }
    })

    return res.data;
};

export default recognizeLang;