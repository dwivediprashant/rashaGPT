import axios from "axios";
const getJoke = async () => {
    try {
      const joke = await axios.get(
        "https://official-joke-api.appspot.com/random_joke",
      );
      return joke.data;
    } catch (error) {
      throw error;
    }
  };
export default getJoke;