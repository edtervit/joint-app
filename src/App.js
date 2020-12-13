import "./App.css";
import queryString from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";
import TopTracks from "./components/TopTracks";
import Playlists from "./components/Playlists";

function App() {
  //state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [topStuff, setTopStuff] = useState(null);
  const [theList, setTheList] = useState([]);

  //useeffect
  useEffect(() => {
    let token = queryString.parse(window.location.search);
    let parsedToken = token.access_token;
    if (parsedToken) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        })
        .then((data) => {
          setProfile(data.data);
          setIsLoggedIn(true);
          console.log(data);
        });
    }
  }, []);

  //handlers

  return (
    <div className="App">
      <h1>Joint Playlist</h1>
      {isLoggedIn ? (
        <div className="loggedIn">
          <h2>You're logged in, Hi {profile.display_name}!</h2>
          {profile.images[0].url && <img src={profile.images[0].url} alt="" />}
          <br />
          <Playlists theList={theList} setTheList={setTheList} />
          <TopTracks topStuff={topStuff} setTopStuff={setTopStuff} />
        </div>
      ) : (
        <div className="login">
          <button
            onClick={() => (window.location = "http://localhost:8888/login")}
          >
            CLICK HERE TO LOGIN
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
