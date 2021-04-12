import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Loading(props) {
  const [meme, setMeme] = useState("");

  const getMeme = async () => {
    const response = await axios(
      "https://www.reddit.com/r/showerthoughts/top/.json"
    );
    const list = response.data.data.children;
    const joke = list[Math.floor(Math.random() * list.length)].data.title;
    setMeme(joke);
  };

  useEffect(() => {
    getMeme();
    setInterval(function () {
      getMeme();
    }, 7500);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="cont items-center space-y-4 min-h-75% nav-pad">
      <Spinner size="xl" color="white"></Spinner>
      <h1 className="title text-3xl">Loading</h1>
      {props.importSongs && (
        <p>Each 100 songs takes about 1 second so bare with us.</p>
      )}
      {meme && (
        <div className="absolute bottom-0">
          <p className="text-center text-sm">{meme && meme}</p>
          <p className="text-center text-sm py-4">(thanks r/showerThoughts)</p>
        </div>
      )}
    </div>
  );
}

export default Loading;
