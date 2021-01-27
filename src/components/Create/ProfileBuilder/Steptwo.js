import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import SaveProfileToDB from "./SaveProfileToDB";
import { Box, Button, Heading } from "@chakra-ui/react";

import ListOfTracks from "../../reusable/ListOfTracks";

function StepTwo() {
  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const clearList = useStoreActions((action) => action.clearList);

  return (
    <>
      <Heading mb={5}>Step 2 - Review your profile!</Heading>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <Button bg="red.100" m={4} onClick={() => clearList()}>
          😡 Not happy? Go Back and rebuild
        </Button>
        {usersSelectedTracks && <SaveProfileToDB />}
      </Box>
      <Box py={5}>
        <Heading size="md">Your Profile</Heading>
        <p>
          These are the songs we will compare against your friend looking for
          matches.
        </p>

        {usersSelectedTracks && (
          <div>
            <p>
              Total songs: <strong>{usersSelectedTracks.length}</strong>
            </p>
          </div>
        )}

        {usersSelectedTracks && (
          <Box display="flex" justifyContent="center">
            <ListOfTracks TrackList={usersSelectedTracks} />
          </Box>
        )}
      </Box>
    </>
  );
}

export default StepTwo;
