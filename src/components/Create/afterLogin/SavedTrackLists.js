import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";

function SavedTracklists() {
  //state
  const [isLoading, setIsLoading] = useState(false);

  //actions
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
  const setMyTrackListToCompare = useStoreActions(
    (actions) => actions.setMyTrackListToCompare
  );

  //easy state
  let profile = useStoreState((state) => state.profile);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);
  let savedTrackLists = useStoreState((state) => state.savedTrackLists);
  const amountOfSavedTrackLists = useStoreState(
    (state) => state.amountOfSavedTrackLists
  );
  const persistFriendsTrackList = useStoreState(
    (state) => state.persistFriendsTrackList
  );

  //handlers
  const deleteTrackHandler = async (id) => {
    const check = window.confirm("You sure you want to delete this?");

    if (check) {
      let payload = {
        url: `/tracklists/deleteTrackList/${id}`,
        method: "DELETE",
      };
      const res = await callDB(payload);

      if (res) {
        setHasSavedTrackLists(false);
        if (amountOfSavedTrackLists === 1) {
          setSavedTrackLists([]);
        } else if (amountOfSavedTrackLists !== 1) {
          setHasSavedTrackLists(true);
        }
        setAmountOfSavedTrackLists();
      } else {
        console.log("Failed to delete!");
      }
    }
  };

  const history = useHistory();
  const compareTracksHandler = (index) => {
    setMyTrackListToCompare(savedTrackLists[index]);
    history.push("/compare");
  };

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

  useEffect(() => {
    return () => {};
  }, [persistFriendsTrackList]);
  return (
    <div>
      {isLoading && <p>Loading..</p>}
      {savedTrackLists && hasSavedTrackLists ? (
        <div className="gotTrackLists">
          <h2>You're saved track lists</h2>
          <p>
            <strong>
              You have {savedTrackLists.length}/ 3 saved track lists
            </strong>
          </p>
          {savedTrackLists.map((TrackList, index) => {
            if (TrackList) {
              return (
                <div className="aTrackList" key={TrackList._id}>
                  <p>
                    This track list has {TrackList.theList.length} songs. The
                    unique id for this TrackList is , it was created on{" "}
                    {TrackList.createdAt.slice(0, -14)} at{" "}
                    {TrackList.createdAt.slice(11, 16)}
                  </p>
                  <p>
                    Copy this link to share with friends:{" "}
                    <Link to={`share/${TrackList._id}`} target="_blank">
                      {process.env.REACT_APP_FRONT_URL}/share/{TrackList._id}
                    </Link>
                  </p>
                  {Object.keys(persistFriendsTrackList).length !== 0 && (
                    <div className="hasPList">
                      <button onClick={() => compareTracksHandler(index)}>
                        Compare this tracklist to friends
                      </button>
                    </div>
                  )}
                  <button onClick={() => deleteTrackHandler(TrackList._id)}>
                    Delete this tracklist
                  </button>
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
