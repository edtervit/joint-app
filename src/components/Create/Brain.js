import React from "react";
import LandingPage from "./beforeLogin/LandingPage";

import ProfileBuilder from "./ProfileBuilder/ProfileBuilder";

import { useStoreState } from "easy-peasy";
import Dashboard from "./Dashboard/Dashboard";
import FromShare from "./Dashboard/FromShare";
import Loading from "../reusable/Loading";

function Brain() {
  const waitingTrackListCheck = useStoreState(
    (state) => state.waitingTrackListCheck
  );

  //state
  const isLogged = useStoreState((state) => state.isLoggedIn);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);

  const fromSharePage = useStoreState((state) => state.fromSharePage);

  return (
    <div className="App">
      {isLogged ? (
        <div className="isloggedIn">
          {fromSharePage && !waitingTrackListCheck && <FromShare />}
          <br />
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
