import React from "react";
import { useStoreState } from "easy-peasy";

import { Redirect } from "react-router-dom";
import BothTrackLists from "./BothTrackLists";

function Compare() {
  //easy state
  let myTrackListToCompare = useStoreState(
    (state) => state.myTrackListToCompare
  );
  let persistFriendsTrackList = useStoreState(
    (state) => state.persistFriendsTrackList
  );

  return (
    <div>
      {!myTrackListToCompare && <Redirect to="/" />}
      {!persistFriendsTrackList && <Redirect to="/" />}
      <h1>Compare page</h1>
      {myTrackListToCompare && persistFriendsTrackList && <BothTrackLists />}
    </div>
  );
}

export default Compare;
