import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ProfileBuilder from "../ProfileBuilder/ProfileBuilder";
import Compare from "../../Compare/Compare";

function FromShare() {
  //easy peasyy state
  const persistFriendsTrackList = useStoreState(
    (state) => state.persistFriendsTrackList
  );
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);
  const savedTrackLists = useStoreState((state) => state.savedTrackLists);

  //easy peasy actions
  const setMyTrackListToCompare = useStoreActions(
    (actions) => actions.setMyTrackListToCompare
  );
  useEffect(() => {
    savedTrackLists && setMyTrackListToCompare(savedTrackLists[0]);
    console.log("done");
    return () => {};
  }, [savedTrackLists]);

  return (
    <div>
      {!hasSavedTrackLists && (
        <div className="noProfile">
          <h2>
            Please make a profile to compare with {persistFriendsTrackList.name}
          </h2>
          <ProfileBuilder />
        </div>
      )}
      {hasSavedTrackLists && (
        <div className="hasProfile">
          <Compare />
        </div>
      )}
    </div>
  );
}

export default FromShare;
