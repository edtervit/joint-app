import React from "react";
import queryString from "query-string";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function TopTracks({ topStuff, setTopStuff }) {
  //state
  const [topWhen, setTopWhen] = useState(null);
  const [whenError, setWhenError] = useState(false);

  //handlers
  const getTopHandler = () => {
    let token = queryString.parse(window.location.search);
    let parsedToken = token.access_token;
    if (parsedToken && topWhen) {
      axios
        .get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${topWhen}&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        )
        .then((data) => {
          setTopStuff(data);
          console.log(data);
          setWhenError(false);
        });
    } else {
      console.log("Error");
      setWhenError(true);
    }
  };

  return (
    <div className="topData">
      <div className="topTracks">
        <label htmlFor="short">From past month</label>
        <input
          type="radio"
          name="toptracksbtn"
          id="short"
          value="short_term"
          onClick={() => setTopWhen("short_term")}
        />
        <label htmlFor="medium">From past 6 months</label>
        <input
          type="radio"
          name="toptracksbtn"
          id="medium"
          value="medium_term"
          onClick={() => setTopWhen("medium_term")}
        />
        <label htmlFor="long">From all time</label>
        <input
          type="radio"
          name="toptracksbtn"
          id="long"
          value="long_term"
          onClick={() => setTopWhen("long_term")}
        />

        <button onClick={() => getTopHandler()} id="toptracksbtn">
          Get Top Tracks
        </button>
        {whenError ? (
          <div className="error">
            <br />
            <ErrorText>Error, please select when.</ErrorText>
          </div>
        ) : (
          ""
        )}
        <br />
        {topStuff
          ? topStuff.data.items.map((aSong) => (
              <Cont>
                <SongBox>
                  <img src={aSong.album.images[0].url} alt="album art" />
                  <p>
                    <strong>{aSong.name}</strong> - {aSong.artists[0].name}
                  </p>
                  <audio src={aSong.preview_url} controls></audio>
                </SongBox>
              </Cont>
            ))
          : ""}
      </div>
    </div>
  );
}

export default TopTracks;

const ErrorText = styled.p`
  color: red;
`;

const SongBox = styled.div`
  display: flex;
  img {
    width: 10%;
  }
  margin: 0.5rem 0rem;
  width: 50%;

  border-radius: 30px;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
`;

const Cont = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: white;
`;
