import axios from "axios";
const getGroqAPIResponse = async (message) => {
  try {
    const result = await axios({
      method: "POST",
      url: "https://api.groq.com/openai/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      data: {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
    });
    //return api result
    return result.data.choices[0].message.content;
  } catch (err) {
    console.log("GROQ API related error!", err);
    res.status(500).json({ error: "GROQ API related error!" });
  }
};

export default getGroqAPIResponse;
