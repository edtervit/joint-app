import React from "react";
import { useStoreState } from "easy-peasy";

import SaveJointPlaylist from "./SaveJointPlaylist";

function JointList() {
  //normal state

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);
  return (
    <div>
      {jointList && jointList.theList.length > 0 && <SaveJointPlaylist />}
      <h1>
        Uh oh! Looks like you and {jointList.userFriendName} don't have anything
        in common!
      </h1>
      <p>
        <strong>
          You or {jointList.userFriendName} might need to re-create their
          profile to have more songs{" "}
        </strong>
      </p>
      <p>or maybe its just not meant to be...</p>
    </div>
  );
}

export default JointList;
