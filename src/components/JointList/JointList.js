import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";
import MakePlaylist from "./MakePlaylist";
import SaveJointPlaylist from "./SaveJointPlaylist";

function JointList() {
  //normal state
  const [toggleList1, setToggleList1] = useState(true);
  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);

  return (
    <div>
      <TLdiv>
        <h3>
          {jointList.userCreatorName}'s and {jointList.userFriendName}'s joint
          playlist
        </h3>
        <p>You have {jointList.theList.length} songs in common!</p>
        {jointList && <MakePlaylist />}
        {jointList && <SaveJointPlaylist />}
        <button onClick={() => setToggleList1(!toggleList1)}>show/hide</button>
        {toggleList1 && (
          <div className="songs">
            {jointList ? (
              jointList.theList.map((track, index) => (
                <div className="aTrack-cont" key={track.uri}>
                  <div className="aTrack">
                    <img src={track.image} alt="" />
                    <p>
                      <strong>
                        {index + 1}. {track.name}
                      </strong>{" "}
                      by {track.artist}
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
    </div>
  );
}

export default JointList;

const TLdiv = styled.div`
  background-color: #fafafa;
  padding: 1.5rem 0;
  width: 100%;
  display: inline-block;
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
