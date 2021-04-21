import React, { useEffect } from "react";

import logo from "../../joint.png";

import Profile from "./Profile";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

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
      <div className="nav bg-gray bg-opacity-30 absolute p-4 w-full flex text-white items-center flex-wrap">
        <ReactLink to="/">
          {" "}
          <img className="logo" src={logo} alt="joint playlist logo" />
        </ReactLink>
        {hasSavedTrackLists && (
          <>
            <div className="ml-auto space-x-4 md:flex flex-wrap items-center hidden">
              <ReactLink className="text-white" to="/">
                Home
              </ReactLink>
              <ReactLink className="text-white" to="/myprofile">
                Profile
              </ReactLink>
              <ReactLink className="text-white" to="/playlistmaker">
                Playlist Maker
              </ReactLink>
              <a
                className="text-white"
                href="https://ko-fi.com/edtervit"
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
              <Profile />
            </div>
            <div className="mobile nav md:hidden flex ml-auto items-center space-x-2">
              <Profile />
              <Menu>
                <MenuButton
                  className="bg-transparent!"
                  aria-label="menu"
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList className="bg-black! bg-opacity-90!">
                  <MenuItem className="active-override">
                    <ReactLink className="text-white active-override" to="/">
                      Home
                    </ReactLink>
                  </MenuItem>
                  <MenuItem className="active-override">
                    <ReactLink
                      className="text-white active-override"
                      to="/myprofile"
                    >
                      Profile
                    </ReactLink>
                  </MenuItem>
                  <MenuItem className="active-override">
                    <ReactLink
                      className="text-white active-override"
                      to="/playlistmaker"
                    >
                      Playlist Maker
                    </ReactLink>
                  </MenuItem>
                  <MenuItem className="active-override">
                    <a
                      className="text-white active-override"
                      href="https://ko-fi.com/edtervit"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Donate
                    </a>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </>
        )}
        {isLogged && !hasSavedTrackLists && (
          <div className="ml-auto">
            <Profile />
          </div>
        )}
      </div>
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
