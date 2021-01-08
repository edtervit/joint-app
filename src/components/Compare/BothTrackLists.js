import React, { useState } from "react";
import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { Button } from "@chakra-ui/react";

function BothTrackLists() {
  //normal state
  const [toggleList1, setToggleList1] = useState(true);
  const [toggleList2, setToggleList2] = useState(true);

  //easy state
  let myTrackListToCompare = useStoreState(
    (state) => state.myTrackListToCompare
  );
  let persistFriendsTrackList = useStoreState(
    (state) => state.persistFriendsTrackList
  );

  return (
    <div>
      <TLdiv>
        <h2>Your track list</h2>
        <Button onClick={() => setToggleList1(!toggleList1)}>show/hide</Button>
        {toggleList1 && (
          <div className="songs">
            {myTrackListToCompare ? (
              myTrackListToCompare.theList.map((track, index) => (
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
      <TLdiv>
        <h2>{persistFriendsTrackList.name}'s track list</h2>
        <Button onClick={() => setToggleList2(!toggleList2)}>show/hide</Button>
        {toggleList2 && (
          <div className="songs">
            {persistFriendsTrackList ? (
              persistFriendsTrackList.theList.map((track, index) => (
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

export default BothTrackLists;

const TLdiv = styled.div`
  background-color: #fafafa;
  padding: 1.5rem 0;
  width: 50%;
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
