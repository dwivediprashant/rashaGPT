import axios from "axios";
import { useEffect, useState } from "react";

export default function WelcomeMsg() {
  const [joke, setJoke] = useState("");
  const getJoke = async () => {
    const joke = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
    );
    setJoke(joke.data);
  };
  useEffect(() => {
    getJoke();
  }, []);
  return (
    <div className="m-3 text-center">
      <div className="no-wrap">{joke.setup}</div>
      <div>{joke.punchline}</div>
    </div>
  );
}
