import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader4 from "./Loaders/Loader4";
export default function WelcomeMsg() {
  const [joke, setJoke] = useState("");
  const getJoke = async () => {
    try {
      const joke = await axios.get(
        "https://official-joke-api.appspot.com/random_joke",
      );
      setJoke(joke.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJoke();
  }, []);
  return (
    <div className="m-3 text-center">
      <div>
        <p>{joke.setup}</p>
        <p>{joke.punchline}</p>
      </div>
    </div>
  );
}
