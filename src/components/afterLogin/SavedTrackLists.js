import React, { useState, useEffect } from "react";

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
  const setAmountOfSavedTrackLists = useStoreActions(
    (actions) => actions.setAmountOfSavedTrackLists
  );

  let profile = useStoreState((state) => state.profile);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);
  let savedTrackLists = useStoreState((state) => state.savedTrackLists);

  useEffect(() => {
    const getSavedTrackLists = async (id) => {
      setIsLoading(true);
      let payload = {
        url: `/tracklists/getTrackLists/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);

      if (res && res.length > 0) {
        setIsLoading(false);
        setSavedTrackLists(res);
        setHasSavedTrackLists(true);
        setAmountOfSavedTrackLists();
        console.log(res);
      } else {
        console.log("Database error or savedtracklists is empty array");
        setHasSavedTrackLists(false);
        setIsLoading(false);
      }
    };
    getSavedTrackLists(profile.id);
    // eslint-disable-next-line
  }, [profile.id, hasSavedTrackLists]);
  return (
    <div>
      {isLoading && <p>Loading..</p>}
      {savedTrackLists ? (
        <div className="gotTrackLists">
          <h2>You're saved track lists</h2>
          <p>
            <strong>
              You have {savedTrackLists.length}/ 3 saved track lists
            </strong>
          </p>
          {savedTrackLists.map((TrackList) => {
            if (TrackList) {
              return (
                <div className="aTrackList">
                  <p>
                    This track list has {TrackList.theList.length} songs. The
                    unique id for this TrackList is {TrackList._id}, it was
                    created on {TrackList.createdAt.slice(0, -14)} at{" "}
                    {TrackList.createdAt.slice(11, 16)}
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <p>You don't have any saved Tracklists.</p>
      )}
    </div>
  );
}

export default SavedTracklists;
