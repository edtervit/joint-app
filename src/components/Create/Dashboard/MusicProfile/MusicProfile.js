import React from "react";

import { useStoreState, useStoreActions } from "easy-peasy";

import { useToast, Button, Box, Heading } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import QuickShareLink from "../QuickShareLink";
import ProfileSongList from "./ProfileSongList";
import CustomName from "./CustomName";

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

  //easy state

  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);
  const savedTrackLists = useStoreState((state) => state.savedTrackLists);

  //handlers
  const deleteTrackHandler = async (id) => {
    const check = window.confirm(
      "You sure you want to delete your music profile? \nYour current share link will no longer work, you will get a new one once you've rebuilt."
    );

    if (check) {
      let payload = {
        url: `/tracklists/deleteTrackList/${id}`,
        method: "DELETE",
      };
      const res = await callDB(payload);

      if (res) {
        setHasSavedTrackLists(false);
        setSavedTrackLists([]);
        setAmountOfSavedTrackLists(0);
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

  return (
    <Box>
      {!isLoggedIn && <Redirect to="/" />}
      {!hasSavedTrackLists && <Redirect to="/" />}
      <Heading my={5}>Your Music Profile</Heading>
      <CustomName />
      <QuickShareLink />
      <Button
        bg="red.100"
        onClick={() => deleteTrackHandler(savedTrackLists[0]._id)}
      >
        Delete profile and rebuild
      </Button>
      <ProfileSongList />
    </Box>
  );
}

export default SavedTracklists;
