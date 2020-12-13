import React from "react";
import queryString from "query-string";
import { useEffect } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setProfile }) {
  //use effect
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
        })
        .catch((err) => setIsLoggedIn(false));
    }
  }, [setProfile, setIsLoggedIn]);

  return (
    <div>
      <div className="login">
        <button
          onClick={() => (window.location = "http://localhost:8888/login")}
        >
          CLICK HERE TO LOGIN
        </button>
      </div>
    </div>
  );
}

export default Login;
