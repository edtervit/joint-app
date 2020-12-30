import React from "react";
import { useStoreState } from "easy-peasy";

function FromShare() {
  //easy peasyy state
  const persistFriendsTrackList = useStoreState(
    (state) => state.persistFriendsTrackList
  );
  return (
    <div>
      <h2>
        Please make a profile to compare with {persistFriendsTrackList.name}
      </h2>
    </div>
  );
}

export default FromShare;
