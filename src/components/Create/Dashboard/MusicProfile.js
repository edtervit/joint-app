import React, { useEffect, useState } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import { useHistory, Redirect } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Link, useClipboard } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function SavedTracklists() {
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

  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
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
    const check = window.confirm(
      "You sure you want to delete your music profile?"
    );

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
    return () => {};
  }, [persistFriendsTrackList]);

  //Save to clipboard
  const [clipboardValue, setClipboardValue] = useState(null);
  const { hasCopied, onCopy } = useClipboard(clipboardValue);
  const doClipboard = (value) => {
    setClipboardValue(value);
    onCopy();
  };

  return (
    <div>
      {!isLoggedIn && <Redirect to="/" />}
      {!hasSavedTrackLists && <Redirect to="/" />}
      {savedTrackLists && hasSavedTrackLists ? (
        <div className="gotTrackLists">
          <h2>You have a saved music profile.</h2>

          {savedTrackLists.map((TrackList, index) => {
            if (TrackList) {
              return (
                <div className="aTrackList" key={TrackList._id}>
                  <p>
                    This music profile has {TrackList.theList.length} songs, it
                    was created on {TrackList.createdAt.slice(0, -14)} at{" "}
                    {TrackList.createdAt.slice(11, 16)}
                  </p>
                  <p>
                    Copy this link to share with friends:{" "}
                    <Link
                      as={ReactLink}
                      to={`share/${TrackList._id}`}
                      target="_blank"
                    >
                      {process.env.REACT_APP_FRONT_URL}/share/{TrackList._id}
                    </Link>
                    <Button
                      ml={3}
                      onClick={() =>
                        doClipboard(
                          `${process.env.REACT_APP_FRONT_URL}/share/${TrackList._id}`
                        )
                      }
                    >
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                  </p>
                  {Object.keys(persistFriendsTrackList).length !== 0 &&
                    console.log(history) && (
                      <div className="hasPList">
                        {compareTracksHandler(index)}
                      </div>
                    )}
                  <Button onClick={() => deleteTrackHandler(TrackList._id)}>
                    Delete your music profile and rebuild!
                  </Button>
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
