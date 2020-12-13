import React from "react";
import queryString from "query-string";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
function Playlists({ theList, setTheList }) {
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
        });
    }
  };

  return (
    <Cont>
      {hasPlaylists ? (
        <div className="playlists">
          <h2>Your playlists</h2>
          <button onClick={() => setDisplayPlaylists(!displayPlaylists)}>
            Hide/Show
          </button>
          <button
            style={{ display: "inline-block" }}
            onClick={() => getPlaylistHandler()}
          >
            Get Playlists again
          </button>
          {displayPlaylists &&
            playlists.data.items.map((aPlaylist) => (
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
      <br />
      {!hasPlaylists && (
        <button
          style={{ display: "inline-block" }}
          onClick={() => getPlaylistHandler()}
        >
          Get Playlists
        </button>
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
