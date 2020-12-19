import React, { useState } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";

function SavedTracklists() {
  //state
  const [isLoading, setIsLoading] = useState(false);

  const callDB = useStoreActions((actions) => actions.callDB);
  const setHasSavedTrackLists = useStoreActions(
    (actions) => actions.setHasSavedTrackLists
  );
  const setSavedTrackLists = useStoreActions(
    (actions) => actions.setSavedTrackLists
  );

  let profile = useStoreState((state) => state.profile);
  let hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);
  let savedTrackLists = useStoreState((state) => state.savedTrackLists);

  const getSavedTrackLists = async (id) => {
    setIsLoading(true);
    let payload = {
      url: `/getTrackLists/${id}`,
      method: "GET",
    };
    const res = await callDB(payload);

    if (res && res.length > 0) {
      setIsLoading(false);
      setSavedTrackLists(res);
      setHasSavedTrackLists(true);
    } else {
      console.log("Database error or savedtracklists is empty array");
      setHasSavedTrackLists(false);
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading && <p>Loading..</p>}
      <button onClick={() => getSavedTrackLists(profile.id)}>
        Get saved TrackLists
      </button>
      {hasSavedTrackLists ? (
        <div className="gotTrackLists">
          {savedTrackLists.map((TrackList) => {
            return (
              <div className="aTrackList">
                <p>
                  Your name is {TrackList.name}, your id is {TrackList.id} and
                  the unique id for this TrackList is {TrackList._id}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>You don't have any saved Tracklists.</p>
      )}
    </div>
  );
}

export default SavedTracklists;
