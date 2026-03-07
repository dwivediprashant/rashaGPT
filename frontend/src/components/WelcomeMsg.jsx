import { useEffect, useState } from "react";
import getJoke from "./utils/getJoke";
import { useContext } from "react";
import MainContext from "../context/MainContext";
export default function WelcomeMsg() {
  const { prompt } = useContext(MainContext);
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");


  useEffect(() => {
    if (!prompt || prompt == "" || prompt.length == 0) {

      const fetchJoke = async () => {
        try {
          const joke = await getJoke()
          const { setup, punchline } = joke;
          setSetup(setup)
          setPunchline(punchline)

        } catch (error) {
          console.log("Faliled to fetch joke" + error)
        }

      }
      fetchJoke();
    }
  }, [prompt])
  return (
    <div className="m-3 text-center">
      <div className="flex-col items-center">
        <p>{setup}</p>
        <p>{punchline}</p>
      </div>
    </div>
  );

}

