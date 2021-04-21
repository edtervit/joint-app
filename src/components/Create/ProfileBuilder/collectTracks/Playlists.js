import React from "react";
import queryString from "query-string";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";

function Playlists({ theList, setTheList, setIsLoggedIn }) {
  //state
  const [playlists, setPlaylists] = useState({});
  const [hasPlaylists, setHasPlaylists] = useState(false);
  const [displayPlaylists, setDisplayPlaylists] = useState(false);
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
        })
        .catch((err) => setIsLoggedIn(false));
    }
  };

  return (
    <Cont>
      {hasPlaylists ? (
        <div className="playlists">
          <h2>Your playlists</h2>
          <Button onClick={() => setDisplayPlaylists(!displayPlaylists)}>
            Hide/Show
          </Button>
          <Button
            style={{ display: "inline-block" }}
            onClick={() => getPlaylistHandler()}
          >
            Get Playlists again
          </Button>
          {displayPlaylists &&
            playlists.data.items.map((aPlaylist) => (
              <div className="aplaylist">
                <input type="checkbox" />
                {aPlaylist.name}
              </div>
            ))}
        </div>
      ) : (
        ""
      )}
      {!hasPlaylists && (
        <Button
          style={{ display: "inline-block" }}
          onClick={() => getPlaylistHandler()}
        >
          Get Playlists
        </Button>
      )}
    </Cont>
  );
}

export default Playlists;

const Cont = styled.div`
  background: #fafafa;
  margin: 3rem 0;
  padding: 1.5rem 0;
`;
