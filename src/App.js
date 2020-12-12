import "./App.css";
import queryString from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  //state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
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
        });
    }
  }, []);

  return (
    <div className="App">
      <h1>Hello world</h1>
      {isLoggedIn ? (
        <div className="loggedIn">
          <h2>You're logged in, Hi {profile.display_name}!</h2>
          <img src={profile.images[0].url} alt="" />
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
