import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import Steptwo from "./Steptwo";

function Yourtracks() {
  //Local state
  const [toggleList, setToggleList] = useState(true);
  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const clearList = useStoreActions((action) => action.clearList);

  return (
    <TLdiv>
      <h2>Current track list</h2>
      <p>
        These are the songs we will compare against your friend looking for
        matches.
      </p>
      {usersSelectedTracks && <Steptwo />}
      {usersSelectedTracks && <p>Total songs: {usersSelectedTracks.length}</p>}
      <button onClick={() => clearList()}>Clear list</button>
      <button onClick={() => setToggleList(!toggleList)}>show/hide</button>
      {toggleList && (
        <div className="songs">
          {usersSelectedTracks ? (
            usersSelectedTracks.map((track) => (
              <div className="aTrack-cont" key={track.uri}>
                <div className="aTrack">
                  <img src={track.image} alt="" />
                  <p>
                    <strong>{track.name}</strong> by {track.artist}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h4>You haven't selected any tracks yet!</h4>
          )}
        </div>
      )}
    </TLdiv>
  );
}

export default Yourtracks;

const TLdiv = styled.div`
  background-color: #fafafa;
  padding: 1.5rem 0;
  .songs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    .aTrack-cont {
      width: 100%;
      .aTrack {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;
        margin: 0 auto;
        img {
          width: 75px;
        }
      }
    }
  }
`;
