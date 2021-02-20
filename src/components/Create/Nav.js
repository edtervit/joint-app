import React, { useEffect } from "react";

import logo from "../../joint.png";

import styled from "styled-components";
import Profile from "./Profile";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function Nav() {
  const isLogged = useStoreState((state) => state.isLoggedIn);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);

  const profile = useStoreState((state) => state.profile);
  const isGuest = useStoreState((state) => state.isGuest);
  //actions
  const callDB = useStoreActions((actions) => actions.callDB);

  const setWaitingTrackListCheck = useStoreActions(
    (actions) => actions.setWaitingTrackListCheck
  );

  const setHasSavedTrackLists = useStoreActions(
    (actions) => actions.setHasSavedTrackLists
  );
  const setSavedTrackLists = useStoreActions(
    (actions) => actions.setSavedTrackLists
  );

  useEffect(() => {
    const getSavedTrackLists = async (id) => {
      setWaitingTrackListCheck(true);
      let payload = {
        url: `/tracklists/getTrackLists/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);

      if (res && res.length > 0) {
        await setSavedTrackLists(res);
        setHasSavedTrackLists(true);
        setWaitingTrackListCheck(false);
      } else {
        console.log("Database error or savedtracklists is empty array");
        setHasSavedTrackLists(false);
        setWaitingTrackListCheck(false);
      }
    };

    if (profile) {
      getSavedTrackLists(profile.id);
    }

    // eslint-disable-next-line
  }, [profile, hasSavedTrackLists]);

  return (
    <div>
      <Navbar>
        <ReactLink to="/">
          {" "}
          <img className="logo" src={logo} alt="" />
        </ReactLink>
        {hasSavedTrackLists && (
          <div className="hasSaved">
            <Link mr={4} as={ReactLink} to="/">
              Dashboard
            </Link>
            <Link mr={4} as={ReactLink} to="/myprofile">
              My Music Profile
            </Link>
            <Link mr={4} as={ReactLink} to="/playlistmaker">
              Playlist Maker
            </Link>
            <Link
              mr={4}
              as="a"
              href="https://ko-fi.com/edtervit"
              target="_blank"
            >
              Donate
            </Link>
            <Profile />
          </div>
        )}
        {isLogged && !hasSavedTrackLists && (
          <div className="has-profile">
            <Profile />
          </div>
        )}
      </Navbar>
      {isGuest && (
        <Box bg="green.100">
          <Text p={1}>
            You're logged in as a guest. Refreshing your page will delete any
            progress.
          </Text>
        </Box>
      )}
    </div>
  );
}

export default Nav;

const Navbar = styled.nav`
  background: #f7fafc;
  padding: 0.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .logo {
    margin: 0;
    padding: 0;
    height: 50px;
  }
  .has-profile {
    margin-left: auto;
  }
  p.logout {
    cursor: pointer;
  }
  .hasSaved {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
`;
