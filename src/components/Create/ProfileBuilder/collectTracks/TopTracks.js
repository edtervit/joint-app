import React from "react";
import queryString from "query-string";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function TopTracks({ topStuff, setTopStuff }) {
  //state
  const [topWhen, setTopWhen] = useState(null);
  const [whenError, setWhenError] = useState(false);
  const [topArtists, setTopArtists] = useState(false);

  //handlers
  const getTopSongsHandler = () => {
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

  const getTopArtistsHandler = () => {
    let token = queryString.parse(window.location.search);
    let parsedToken = token.access_token;
    if (parsedToken && topWhen) {
      axios
        .get(
          `https://api.spotify.com/v1/me/top/artists?time_range=${topWhen}&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        )
        .then((data) => {
          setTopArtists(data);
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
        <OptionsDiv>
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
        </OptionsDiv>
        <br />
        <button onClick={() => getTopSongsHandler()} id="toptracksbtn">
          Get Top Tracks
        </button>
        <button onClick={() => getTopArtistsHandler()} id="toptracksbtn">
          Get Top Artists
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
        <ListHolder>
          <Cont1>
            {topStuff && <h3>Top Songs</h3>}
            {topStuff
              ? topStuff.data.items.map((aSong, index) => (
                  <SongBox>
                    <img src={aSong.album.images[0].url} alt="album art" />
                    <p>
                      <strong>
                        {index + 1 + ". "}
                        {aSong.name}
                      </strong>{" "}
                      - {aSong.artists[0].name}
                    </p>
                    <audio src={aSong.preview_url} controls></audio>
                  </SongBox>
                ))
              : ""}
          </Cont1>

          <Cont>
            {topArtists && <h3>Top Artists</h3>}
            {topArtists
              ? topArtists.data.items.map((aSong, index) => (
                  <ArtistsBox>
                    <p>{index + 1}</p>
                    <img src={aSong.images[0].url} alt="album art" />
                    <p>
                      <strong>{aSong.name}</strong> -{" "}
                      {aSong.genres.map((genre) => genre + " ")}
                    </p>
                  </ArtistsBox>
                ))
              : ""}
          </Cont>
        </ListHolder>
      </div>
    </div>
  );
}

export default TopTracks;

const ErrorText = styled.p`
  color: red;
`;

const ListHolder = styled.div`
  display: flex;
`;

const SongBox = styled.div`
  display: flex;
  img {
    width: 30%;
  }
  margin: 0.5rem 0rem;
  width: 60%;
  flex-direction: column;
  border-radius: 30px;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  flex-wrap: wrap;
  padding: 1rem;
  audio {
    display: block;
  }
`;

const ArtistsBox = styled.div`
  display: flex;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 0 1rem;
  }

  margin: 0.5rem 0rem;
  width: 50%;
  padding: 0 3rem;
  border-radius: 30px;
  align-items: center;
  background: #fafafa;
`;

const Cont1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: white;
  flex-wrap: wrap;
  h3 {
    display: block;
    width: 100%;
  }
`;

const Cont = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background: white;
  flex-wrap: wrap;
  flex-direction: column;
  h3 {
    display: block;
    width: 100%;
  }
`;

const OptionsDiv = styled.div`
  * {
    padding-left: 2rem;
  }
`;
