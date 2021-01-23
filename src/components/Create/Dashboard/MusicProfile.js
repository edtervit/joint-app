import React, { useEffect, useState } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";

import { Link, useClipboard, useToast, Button, Box } from "@chakra-ui/react";
import { Link as ReactLink, useHistory, Redirect } from "react-router-dom";

function SavedTracklists() {
  //  //toast
  const toast = useToast();

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
        toast({
          title: "Error!",
          description:
            "Failed to delete, maybe the database is down, or this profile doesn't exists. Try refresh!",
          status: "error",
          isClosable: "true",
        });
      }
    }
  };

  const history = useHistory();
  const compareTracksHandler = (index) => {
    setMyTrackListToCompare(savedTrackLists[index]);
    history.push("/compare");
  };

  useEffect(() => {
    if (savedTrackLists) {
      setClipboardValue(
        `${process.env.REACT_APP_FRONT_URL}/share/${savedTrackLists[0]._id}`
      );
    }
  }, [persistFriendsTrackList, savedTrackLists]);

  //Save to clipboard
  const [clipboardValue, setClipboardValue] = useState(null);
  const { hasCopied, onCopy } = useClipboard(clipboardValue);

  return (
    <Box>
      {!isLoggedIn && <Redirect to="/" />}
      {!hasSavedTrackLists && <Redirect to="/" />}
    </Box>
  );
}

export default SavedTracklists;
