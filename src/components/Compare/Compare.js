import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import JointList from "../JointList/JointList";

function Compare() {
  //local state
  const [compareLoading, setCompareLoading] = useState(null);
  //easy state
  let myTrackListToCompare = useStoreState(
    (state) => state.myTrackListToCompare
  );
  let persistFriendsTrackList = useStoreState(
    (state) => state.persistFriendsTrackList
  );
  let jointList = useStoreState((state) => state.jointList);

  //easy actions
  const setJointList = useStoreActions((actions) => actions.setJointList);

  //handlers
  const compareTracksHandler = () => {
    setCompareLoading(true);
    const theirs = persistFriendsTrackList.theList;
    const yours = myTrackListToCompare.theList;
    let jointList = [];
    if (yours && theirs) {
      if (yours.length > theirs.length) {
        theirs.forEach((i) => {
          if (yours.some((me) => me.uri === i.uri)) {
            jointList.push(i);
          }
        });
      } else {
        yours.forEach((i) => {
          if (theirs.some((me) => me.uri === i.uri)) {
            jointList.push(i);
          }
        });
      }
      const final = {
        theList: jointList,
        userCreatorName: myTrackListToCompare.name,
        userCreatorID: myTrackListToCompare.id,
        userFriendName: persistFriendsTrackList.name,
        userFriendID: persistFriendsTrackList.id,
      };

      setJointList(final);
      setCompareLoading(false);
    }
  };

  useEffect(() => {
    myTrackListToCompare &&
      persistFriendsTrackList &&
      !compareLoading &&
      !jointList &&
      compareTracksHandler();
    return () => {};
    // eslint-disable-next-line
  }, [myTrackListToCompare]);

  return (
    <div>
      {compareLoading && <p>Comparing...</p>}
      {jointList && <JointList />}
    </div>
  );
}

export default Compare;
