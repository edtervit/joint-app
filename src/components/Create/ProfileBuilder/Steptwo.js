import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import SaveProfileToDB from "./SaveProfileToDB";

import ListOfTracks from "../../reusable/ListOfTracks";

function StepTwo() {
  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const clearList = useStoreActions((action) => action.clearList);

  useEffect(() => {
    document.title = "Profile Builder - Step 2";
  }, []);

  return (
    <div className="">
      <div className="nav-pad cont">
        <h1 className="title mb-4 ">Step 2 - Review your profile!</h1>
        <p>
          These are the songs we will compare against your friend looking for
          matches.
        </p>
        {usersSelectedTracks && (
          <div>
            <ListOfTracks TrackList={usersSelectedTracks} showTotal />
          </div>
        )}
        <div className="flex justify-center space-x-4 mt-4">
          <div className="">
            <button className="btn bg-red-btn" onClick={() => clearList()}>
              Not happy
            </button>
            <p className="font-thin">Rebuild</p>
          </div>
          <div className="">
            {usersSelectedTracks && <SaveProfileToDB />}
            <p className="font-thin">Save your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwo;
