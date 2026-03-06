import axios from "axios";
const getGroqAPIResponse = async ({message,model}) => {
  try {
    const result = await axios({
      method: "POST",
      url: "https://api.groq.com/openai/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      data: {
        model,
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
    throw err;
  }
};

export default getGroqAPIResponse;
