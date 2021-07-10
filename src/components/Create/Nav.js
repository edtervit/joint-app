import React, { useEffect } from "react";

import logo from "../../joint.png";

import Profile from "./Profile";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { Menu } from "@headlessui/react";

import { GiHamburgerMenu } from "react-icons/gi";

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
      {isGuest && (
        <div className="bg-green relative">
          <Text p={1}>
            You're logged in as a guest. Refreshing your page will delete any
            progress.
          </Text>
        </div>
      )}
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
              <ReactLink className="text-white" to="/alwayswrapped">
                Always Wrapped
              </ReactLink>
              <a
                className="text-white btn border border-white bg-transparent py-1 px-3 font-normal"
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
              <Menu as="div" className="relative">
                <Menu.Button className="bg-transparent! border border-white p-2 text-1xl">
                  {GiHamburgerMenu}
                </Menu.Button>
                <Menu.Items className="bg-black! bg-opacity-90! absolute flex flex-col top-11 px-6 py-4 rounded-md right-0 space-y-2">
                  <Menu.Item className="active-override">
                    <ReactLink className="text-white active-override" to="/">
                      Home
                    </ReactLink>
                  </Menu.Item>
                  <Menu.Item className="active-override">
                    <ReactLink
                      className="text-white active-override"
                      to="/myprofile"
                    >
                      Profile
                    </ReactLink>
                  </Menu.Item>
                  <Menu.Item className="active-override">
                    <ReactLink
                      className="text-white active-override"
                      to="/alwayswrapped"
                    >
                      Always Wrapped
                    </ReactLink>
                  </Menu.Item>
                  <Menu.Item className="active-override">
                    <a
                      className="text-white active-override"
                      href="https://ko-fi.com/edtervit"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Donate
                    </a>
                  </Menu.Item>
                </Menu.Items>
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
    </div>
  );
}

export default Nav;
