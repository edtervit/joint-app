import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ProfileBuilder from "../ProfileBuilder/ProfileBuilder";
import Compare from "../../Compare/Compare";
import { Heading } from "@chakra-ui/react";

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
    //eslint-disable-next-line
  }, [savedTrackLists]);

  return (
    <div>
      {!hasSavedTrackLists && (
        <div className="noProfile">
          <Heading size="md" my={5}>
            Please make a profile to compare with {persistFriendsTrackList.name}
          </Heading>
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
