import React, { useEffect } from "react";
import LandingPage from "./beforeLogin/LandingPage";
import Profile from "./ProfileBuilder/Profile";
import ProfileBuilder from "./ProfileBuilder/ProfileBuilder";
import logo from "../../joint.png";

import { useStoreState, useStoreActions } from "easy-peasy";
import Dashboard from "./Dashboard/Dashboard";
import FromShare from "./Dashboard/FromShare";

function Brain() {
  //state
  const isLogged = useStoreState((state) => state.isLoggedIn);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);
  const profile = useStoreState((state) => state.profile);
  const fromSharePage = useStoreState((state) => state.fromSharePage);

  //actions
  const callDB = useStoreActions((actions) => actions.callDB);

  const setHasSavedTrackLists = useStoreActions(
    (actions) => actions.setHasSavedTrackLists
  );
  const setSavedTrackLists = useStoreActions(
    (actions) => actions.setSavedTrackLists
  );

  useEffect(() => {
    const getSavedTrackLists = async (id) => {
      let payload = {
        url: `/tracklists/getTrackLists/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);

      if (res && res.length > 0) {
        setSavedTrackLists(res);
        setHasSavedTrackLists(true);
      } else {
        console.log("Database error or savedtracklists is empty array");
        setHasSavedTrackLists(false);
      }
    };

    if (profile) {
      getSavedTrackLists(profile.id);
    }

    // eslint-disable-next-line
  }, [profile, hasSavedTrackLists]);

  return (
    <div className="App">
      <img className="logo" src={logo} alt="" />

      {isLogged ? (
        <div className="isloggedIn">
          {fromSharePage && <FromShare />}
          <Profile />
          <br />
          {hasSavedTrackLists ? <Dashboard /> : <ProfileBuilder />}
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default Brain;
