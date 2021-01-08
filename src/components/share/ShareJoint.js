import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";
import lemonke from "../../Images/lemonke.jpg";
import { Redirect } from "react-router-dom";
import MakePlaylist from "../JointList/MakePlaylist";
import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function ShareJoint({ match }) {
  //state
  const [isValid, setIsVaild] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  // easy peasy sstate
  let jointList = useStoreState((state) => state.jointList);
  let isLoggedIn = useStoreState((state) => state.isLoggedIn);

  // EP actions
  const setJointList = useStoreActions((actions) => actions.setJointList);

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

  useEffect(() => {
    if (!isLoggedIn && jointList) {
      setRedirect(true);
    }
    return () => {};
    // eslint-disable-next-line
  }, [jointList]);

  return (
    <div>
      {redirect && (
        <Redirect
          to={{
            pathname: "/",
            state: { fromShareJ: "fromShareJ", fromWho: jointList._id },
          }}
        />
      )}
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
          <p>
            Share this joint with someone!<br></br>
            <Link as={ReactLink} to={`${jointList._id}`} target="_blank">
              {process.env.REACT_APP_FRONT_URL}/shareJ/{jointList._id}
            </Link>
          </p>
          <div className="songs">
            <MakePlaylist />
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
