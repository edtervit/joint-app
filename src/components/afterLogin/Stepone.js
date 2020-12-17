import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";

function Stepone() {
  const callAPI = useStoreActions((actions) => actions.callAPI);
  const addToList = useStoreActions((actions) => actions.addToList);
  const token = useStoreState((state) => state.token);

  //Song sources refs local states
  const [TsMonth, setTsMonth] = useState(false);
  const [TsSix, setTsSix] = useState(false);
  const [TsYear, setTsYear] = useState(false);

  const payload1 = {
    TsMonth,
    TsSix,
    TsYear,
    listofsongs: [
      {
        name: "bow hello",
        artist: "Ed",
        uri: "some long random number",
      },
      {
        name: "bow hello 2",
        artist: "Ed 2",
        uri: "some long random number 2",
      },
    ],
  };

  const callAPIHandler = async (payload) => {
    if (payload.TsMonth) {
      console.log("TS month is ticked");
      addToList(payload.listofsongs);
    }

    if (payload.TsSix) {
      console.log("Ts Six is ticked");
    }

    if (payload.TsYear) {
      console.log("Ts year is checked");
    }

    if (!payload.TsYear && !payload.TsSix && !payload.TsMonth) {
      console.log("Nothing ticked");
    }
    // const callRes = await callAPI(payload);
    // console.log(callRes);
  };

  return (
    <div>
      <h2>Step 1</h2>
      <h3>Where shall we get your music from?</h3>
      <button onClick={() => callAPIHandler(payload1)}>Get Songs</button>
      <TopSongsDiv>
        <div className="aOption">
          <label htmlFor="TSmonth">Top 100 played songs from past month</label>
          <input
            onChange={() => {
              setTsMonth(!TsMonth);
            }}
            type="checkbox"
            className="checkbox"
            id="TSmonth"
          />
        </div>
        <div className="aOption">
          <label htmlFor="TsSix">Top 100 played songs from past 6 months</label>
          <input
            onChange={() => {
              setTsSix(!TsSix);
            }}
            type="checkbox"
            className="checkbox"
            id="TsSix"
          />
        </div>
        <div className="aOption">
          <label htmlFor="TsYear">Top 100 played songs from past year</label>
          <input
            onChange={() => {
              setTsYear(!TsYear);
            }}
            type="checkbox"
            className="checkbox"
            id="TsYear"
          />
        </div>
      </TopSongsDiv>
    </div>
  );
}

export default Stepone;

const TopSongsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
