import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";

function TopSongs() {
  const callAPI = useStoreActions((actions) => actions.callAPI);
  const addToList = useStoreActions((actions) => actions.addToList);
  const setGotTopSongs = useStoreActions((actions) => actions.setGotTopSongs);

  //state
  let token = useStoreState((state) => state.token);
  const isGettingData = useStoreState((state) => state.isGettingData);

  //Song sources refs local states
  const [TsMonth, setTsMonth] = useState(false);
  const [TsSix, setTsSix] = useState(false);
  const [TsYear, setTsYear] = useState(false);

  //the sources
  const theSources = {
    TsMonth,
    TsSix,
    TsYear,
  };

  const callAPIHandler = async (payload) => {
    const params = {
      url: `https://api.spotify.com/v1/me/top/tracks?time_range=${payload}&limit=50`,
      token: token,
    };
    //uses the callapi thunk action
    const spotifyResponse = await callAPI(params);
    console.log(spotifyResponse);
    if (spotifyResponse) {
      spotifyResponse.items.forEach((song) => {
        const songName = song.name;
        const songArtist = song.artists[0].name;
        const songImage = song.album.images[0].url;
        const songUri = song.uri;
        const payload = {
          name: songName,
          artist: songArtist,
          image: songImage,
          uri: songUri,
        };
        //for each song use addtolist action to add it to overall list
        addToList(payload);
      });
    }
    // const callRes = await callAPI(payload);
    // console.log(callRes);
  };

  const checkSourcesHandler = async (payload) => {
    if (payload.TsMonth) {
      await callAPIHandler("short_term");
    }
    if (payload.TsSix) {
      await callAPIHandler("medium_term");
    }
    if (payload.TsYear) {
      await callAPIHandler("long_term");
    }
    if (!payload.TsYear && !payload.TsSix && !payload.TsMonth) {
    }
    setGotTopSongs(true);
  };

  useEffect(() => {
    if (isGettingData) {
      checkSourcesHandler(theSources);
    }
    return () => {};
    // eslint-disable-next-line
  }, [isGettingData]);
  return (
    <div>
      <TopSongsDiv>
        <div className="aOption">
          <label htmlFor="TSmonth">Top 50 played songs from past month</label>
          <input
            onChange={() => {
              setTsMonth(!TsMonth);
            }}
            type="checkbox"
            id="TSmonth"
          />
        </div>
        <div className="aOption">
          <label htmlFor="TsSix">Top 50 played songs from past 6 months</label>
          <input
            onChange={() => {
              setTsSix(!TsSix);
            }}
            type="checkbox"
            id="TsSix"
          />
        </div>
        <div className="aOption">
          <label htmlFor="TsYear">Top 50 played songs all time</label>
          <input
            onChange={() => {
              setTsYear(!TsYear);
            }}
            type="checkbox"
            id="TsYear"
          />
        </div>
      </TopSongsDiv>
    </div>
  );
}

export default TopSongs;

//Styled components

const TopSongsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
