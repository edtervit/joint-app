import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import queryString from "query-string";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import explainer from "../../../video/explainervidV1.2.mp4";
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
        {/* If has who then just redirect to login */}
        <WhoDiv>
          {who &&
            (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)}
        </WhoDiv>
        {!shareJID && !who && !gettingProfile && !isGuest && (
          <>
            <Center>
              <Container
                maxWidth="1400px"
                boxShadow="lg"
                bg="gray.50"
                borderRadius="md"
                m={5}
              >
                <Stack direction={["column", "column", "column", "row"]}>
                  <Box
                    textAlign="left"
                    w={["100%", "100%", "100%", "50%"]}
                    p={3}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Heading textAlign="left" my={2} pr="20%">
                      Compare music with friends and find songs in common.
                    </Heading>
                    <Text>1. Login and connect your spotify</Text>
                    <Text>
                      2. Build your profile using your playlists, liked songs
                      etc
                    </Text>
                    <Text>3. Send your profile link to friends to compare</Text>
                    <Text>4. Get a list of the songs you both like</Text>
                    <Text>5. Save it as a playlist to your Spotify</Text>
                    <Button
                      my={3}
                      onClick={() =>
                        (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)
                      }
                    >
                      CLICK HERE TO LOGIN
                    </Button>
                    <Text fontSize="xs">
                      (we won’t show songs you don’t match on, your high school
                      musical obsession is safe with us)
                    </Text>
                  </Box>

                  <Box w={["100%", "100%", "100%", "50%"]} p={3}>
                    <Heading size="lg" my={3}>
                      How it works
                    </Heading>
                    <video src={explainer} controls />
                  </Box>
                </Stack>
              </Container>
            </Center>
          </>
        )}
        {gettingProfile && !who && <Loading />}
        {isGuest && !gettingProfile && <GuestLogin />}
      </div>
    </div>
  );
}

export default LandingPage;

const WhoDiv = styled.div`
  display: none;
`;
