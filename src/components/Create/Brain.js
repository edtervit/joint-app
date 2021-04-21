import React, { useEffect } from "react";
import LandingPage from "./beforeLogin/LandingPage";

import ProfileBuilder from "./ProfileBuilder/ProfileBuilder";

import { useStoreState, useStoreActions } from "easy-peasy";
import Dashboard from "./Dashboard/Dashboard";
import FromShare from "./Dashboard/FromShare";
import Loading from "../reusable/Loading";
import { useHistory } from "react-router-dom";

function Brain() {
  const setIsGuest = useStoreActions((actions) => actions.setIsGuest);

  const waitingTrackListCheck = useStoreState(
    (state) => state.waitingTrackListCheck
  );

  let history = useHistory();

  useEffect(() => {
    //check if on guest page
    if (history && history.location && history.location.pathname === "/guest") {
      console.log("is guest");
      setIsGuest(true);
    }
    // eslint-disable-next-line
  }, [history]);

  //state
  const isLogged = useStoreState((state) => state.isLoggedIn);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);

  const fromSharePage = useStoreState((state) => state.fromSharePage);

  return (
    <div className="App">
      {isLogged ? (
        <div className="isloggedIn">
          {fromSharePage && !waitingTrackListCheck && <FromShare />}
          {waitingTrackListCheck && (
            <>
              <Loading />
            </>
          )}
          {!waitingTrackListCheck && !fromSharePage && (
            <>{hasSavedTrackLists ? <Dashboard /> : <ProfileBuilder />}</>
          )}
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default Brain;
