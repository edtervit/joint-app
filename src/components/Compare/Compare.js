import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import { Redirect } from "react-router-dom";
import BothTrackLists from "./BothTrackLists";
import JointList from "../JointList/JointList";

function Compare() {
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
    const theirs = persistFriendsTrackList.theList;
    const yours = myTrackListToCompare.theList;
    let jointList = [];
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
  };

  return (
    <div>
      {!myTrackListToCompare && <Redirect to="/" />}
      {!persistFriendsTrackList && <Redirect to="/" />}
      <h1>Compare page</h1>
      {!jointList && (
        <button onClick={() => compareTracksHandler()}>
          Click to find matches!
        </button>
      )}
      {jointList && <JointList />}
      {myTrackListToCompare && persistFriendsTrackList && <BothTrackLists />}
    </div>
  );
}

export default Compare;
