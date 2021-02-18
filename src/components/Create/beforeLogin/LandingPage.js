import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import queryString from "query-string";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Button, Center } from "@chakra-ui/react";

import logo from "../../../joint.png";
import Loading from "../../reusable/Loading";
import GuestLogin from "./GuestLogin";

function LandingPage() {
  const history = useHistory();
  const browserState = history.location.state;

  //local state
  let who = null;
  let state = "normal";
  let shareJID = null;

  const [gettingProfile, setGettingProfile] = useState(false);

  if (browserState) {
    if (browserState.fromShare) {
      state = browserState.fromShare;
      who = browserState.fromWho;
    }
    if (browserState.fromShareJ) {
      shareJID = browserState.fromWho;
      state = `${browserState.fromShareJ}&shareJID=${shareJID}`;
    }
  }

  //easy actions
  const getProfile = useStoreActions((actions) => actions.getProfile);

  //easy peasyy state
  const failedCookie = useStoreState((state) => state.failedCookie);

  const fromShareJPage = useStoreState((state) => state.fromShareJPage);

  const shareJIDstate = useStoreState((state) => state.shareJID);

  const isGuest = useStoreState((state) => state.isGuest);

  //use effect

  useEffect(() => {
    if (!failedCookie) {
      let token = queryString.parse(window.location.search);
      if (Object.entries(token).length !== 0) {
        const calltheProfile = async () => {
          setGettingProfile(true);
          await getProfile();
          setGettingProfile(false);
        };
        calltheProfile();
      }
    }
    // eslint-disable-next-line
  }, [failedCookie]);

  return (
    <div>
      {fromShareJPage && shareJIDstate && (
        <Redirect to={`/shareJ/${shareJIDstate}`} />
      )}
      <Center>
        {" "}
        <img className="logo" src={logo} alt="" />
      </Center>
      <div className="login">
        {failedCookie && (
          <div className="failedCookie">
            <p>
              Sorry your request to Spotify failed, try login again to get a new
              cookie 🍪
            </p>
          </div>
        )}
        {shareJID && (
          <div>
            <h1>Please login to see this jointplaylist!</h1>
            <Button
              onClick={() =>
                (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)
              }
            >
              CLICK HERE TO LOGIN
            </Button>
          </div>
        )}
        {who && <Loading />}
        <WhoDiv>
          {who &&
            (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)}
        </WhoDiv>
        {!shareJID && !who && !gettingProfile && !isGuest && (
          <Button
            onClick={() =>
              (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)
            }
          >
            CLICK HERE TO LOGIN
          </Button>
        )}
        {gettingProfile && !who && <Loading />}
        {isGuest && <GuestLogin />}
      </div>
    </div>
  );
}

export default LandingPage;

const WhoDiv = styled.div`
  display: none;
`;
