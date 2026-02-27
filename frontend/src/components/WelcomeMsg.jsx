import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader4 from "./Loaders/Loader4";
import { MyContext } from "../context/context";
export default function WelcomeMsg() {
  const { isLoading, setIsLoading } = useContext(MyContext);
  const [joke, setJoke] = useState("");
  const getJoke = async () => {
    setIsLoading(true);
    try {
      const joke = await axios.get(
        "https://official-joke-api.appspot.com/random_joke",
      );
      setJoke(joke.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJoke();
  }, []);
  return (
    <div className="m-3 text-center">
      {isLoading ? (
        <Loader4 />
      ) : (
        <div>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}
    </div>
  );
}
