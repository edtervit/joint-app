import "./App.css";
import queryString from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";
import TopTracks from "./components/TopTracks";

function App() {
  //state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [playlists, setPlaylists] = useState({});
  const [hasPlaylists, setHasPlaylists] = useState(false);
  const [topStuff, setTopStuff] = useState(null);

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

  const getPlaylistHandler = () => {
    let token = queryString.parse(window.location.search);
    let parsedToken = token.access_token;
    if (parsedToken) {
      axios
        .get("https://api.spotify.com/v1/me/playlists?limit=50", {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        })
        .then((data) => {
          setPlaylists(data);
          console.log(data);
          setHasPlaylists(true);
        });
    }
  };

  return (
    <div className="App">
      <h1>Joint Playlist</h1>
      {isLoggedIn ? (
        <div className="loggedIn">
          <h2>You're logged in, Hi {profile.display_name}!</h2>
          {profile.images[0].url && <img src={profile.images[0].url} alt="" />}
          <br />
          <button
            style={{ display: "inline-block" }}
            onClick={() => getPlaylistHandler()}
          >
            Get Playlists
          </button>
          <TopTracks topStuff={topStuff} setTopStuff={setTopStuff} />
        </div>
      ) : (
        <div className="login">
          <button
            onClick={() =>
              (window.location = "https://joint-backend.herokuapp.com/login")
            }
          >
            CLICK HERE TO LOGIN
          </button>
        </div>
      )}
      {hasPlaylists ? (
        <div className="playlists">
          <h1>we have playlistssss</h1>
          {playlists.data.items.map((aPlaylist) => (
            <div className="aplaylist">
              <input type="checkbox" />
              {aPlaylist.name}
              <p>{aPlaylist.id}</p>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
