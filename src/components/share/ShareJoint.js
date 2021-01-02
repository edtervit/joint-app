import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";
import lemonke from "../../Images/lemonke.jpg";

function ShareJoint({ match }) {
  //state
  const [isValid, setIsVaild] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jointList, setJointList] = useState(null);

  //thunk
  const callDB = useStoreActions((actions) => actions.callDB);

  const params = match.params.trackListID;

  useEffect(() => {
    const getSavedTrackLists = async (id) => {
      let payload = {
        url: `/jointPlaylist/getJointPlaylist/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);

      if (res && res.length > 0) {
        console.log(res[0]);
        setJointList(res[0]);
        setIsVaild(true);
        setIsLoading(false);
      } else {
        console.log("Database error or joint list is empty");
        setIsVaild(false);
        setIsLoading(false);
      }
    };
    getSavedTrackLists(params);
    // eslint-disable-next-line
  }, [params]);

  return (
    <div>
      {isLoading && <p>Loading....</p>}
      {!isValid && !isLoading && (
        <div className="failed">
          <h1>Uh oh stinky!</h1>
          <p>
            {params} doesn't return any matches, you sure you got the link
            right?
          </p>
          <img src={lemonke} alt="" />
        </div>
      )}
      {isValid && (
        <TLdiv>
          <h1>
            This is the joint list of {jointList.userCreatorName} and{" "}
            {jointList.userFriendName} !
          </h1>
          <div className="songs">
            {jointList &&
              jointList.theList.map((track, index) => (
                <div className="aTrack-cont" key={track.uri}>
                  <div className="aTrack">
                    <img src={track.image} alt="" />
                    <p>
                      <strong>
                        {index + 1 + ". "}
                        {track.name}
                      </strong>{" "}
                      by {track.artist}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </TLdiv>
      )}
    </div>
  );
}

export default ShareJoint;

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
