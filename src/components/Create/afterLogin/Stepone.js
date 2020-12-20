import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";

function Stepone() {
  const callAPI = useStoreActions((actions) => actions.callAPI);
  const addToList = useStoreActions((actions) => actions.addToList);

  //state
  let token = useStoreState((state) => state.token);

  //Song sources refs local states
  const [TsMonth, setTsMonth] = useState(false);
  const [TsSix, setTsSix] = useState(false);
  const [TsYear, setTsYear] = useState(false);

  //Errors states
  const [emptyOption, setEmptyOption] = useState(false);

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
      setEmptyOption(false);
      console.log("Ts month ticked");
      await callAPIHandler("short_term");
      console.log("Got the month!");
    }
    if (payload.TsSix) {
      setEmptyOption(false);
      await callAPIHandler("medium_term");
      console.log("Got 6 months!");
    }
    if (payload.TsYear) {
      setEmptyOption(false);
      await callAPIHandler("long_term");
      console.log("Got the year!");
    }
    if (!payload.TsYear && !payload.TsSix && !payload.TsMonth) {
      console.log("Nothing ticked");
      setEmptyOption(true);
    }
  };

  return (
    <div>
      <h2>Step 1</h2>
      <h3>Where shall we get your music from?</h3>
      <button onClick={() => checkSourcesHandler(theSources)}>Get Songs</button>
      {emptyOption && <ErrorText>Please select a source from below</ErrorText>}

      <TopSongsDiv emptyOption={emptyOption}>
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

export default Stepone;

//Styled components
const ErrorText = styled.p`
  color: red;
`;

const TopSongsDiv = styled.div`
  display: flex;
  flex-direction: column;
  label {
    border-bottom: ${(prop) => (prop.emptyOption ? "solid 1px red" : "")};
  }
`;
