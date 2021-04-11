import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import queryString from "query-string";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";

import { FaChevronDown } from "react-icons/fa";

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
    <div className="bg-gray min-h-screen">
      <div className="bg-gradient-to-r from-red to-purple rounded-b-4xl min-h-75% flex flex-col">
        {fromShareJPage && shareJIDstate && (
          <Redirect to={`/shareJ/${shareJIDstate}`} />
        )}
        <img
          className="logo bg-cover pt-8  w- mx-auto"
          src={logo}
          alt="Joint playlist logo"
        />
        <div className="login my-auto">
          {failedCookie && (
            <div className="failedCookie">
              <p>
                Sorry your request to Spotify failed, try login again to get a
                new cookie 🍪
              </p>
            </div>
          )}
          {shareJID && (
            <>
              <h1>Please login to see this jointplaylist!</h1>
              <button
                onClick={() =>
                  (window.locbuttontion = `${process.env.REACT_APP_BACK_URL}/login/${state}`)
                }
              >
                CLICK HERE TO LOGIN
              </button>
            </>
          )}
          {who && <Loading />}
          {/* If has who then just redirect to login */}
          <WhoDiv>
            {who &&
              (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)}
          </WhoDiv>
          {!shareJID && !who && !gettingProfile && !isGuest && (
            <>
              <div className="cont items-center md:pt-32 md:pb-28">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight ">
                  Compare music with friends and find songs in common.
                </h1>
                <button
                  className="btn md:text-3xl my-4 md:mt-16 md:mb-4 "
                  onClick={() =>
                    (window.location = `${process.env.REACT_APP_BACK_URL}/login/${state}`)
                  }
                >
                  Connect
                </button>
                <p className=" md:w-96 mx-auto font-thin">
                  (we won’t show songs you don’t match on, your high school
                  musical obsession is safe with us)
                </p>
              </div>
            </>
          )}
          {gettingProfile && !who && <Loading />}
          {isGuest && !gettingProfile && <GuestLogin />}
        </div>
      </div>
      {!shareJID && !who && !gettingProfile && !isGuest && (
        <div className="bg-gray">
          <div className="cont max-w-screen-xl">
            <p className="font-bold text-3xl my-4">This is how it works</p>
            <FaChevronDown className="text-white text-4xl animate-bounce mx-auto" />
            <div className="my-10 flex flex-wrap">
              <div className="md:w-1/2 mb-4 md:pr-12">
                <video className="shadow-xl" src={explainer} controls />
              </div>
              <ul className="md:w-1/2 text-2xl my-auto space-y-3 text-left pl-12 text-white list-disc list-outside">
                <li> Login and connect your spotify</li>
                <li>
                  Build your profile using your playlists, liked songs etc
                </li>
                <li>Send your profile link to friends to compare</li>
                <li>Get a list of the songs you both like</li>
                <li>Save it as a playlist to your Spotify</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

const WhoDiv = styled.div`
  display: none;
`;
