import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import queryString from "query-string";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";

function LandingPage() {
  const history = useHistory();
  const browserState = history.location.state;

  //local state
  let who = null;
  let state = "normal";
  let shareJID = null;

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

  //use effect

  useEffect(() => {
    if (!failedCookie) {
      let token = queryString.parse(window.location.search);
      if (Object.entries(token).length !== 0) {
        getProfile();
      }
    }
    // eslint-disable-next-line
  }, [failedCookie]);

  return (
    <div>
      {fromShareJPage && <Redirect to={`/shareJ/${shareJIDstate}`} />}
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
        {who && <p>Please login to compare music with {who}!</p>}
        <WhoDiv>
          {who &&
            (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)}
        </WhoDiv>
        {!shareJID && (
          <Button
            onClick={() =>
              (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)
            }
          >
            CLICK HERE TO LOGIN
          </Button>
        )}
      </div>
    </div>
  );
}

export default LandingPage;

const WhoDiv = styled.div`
  display: none;
`;
