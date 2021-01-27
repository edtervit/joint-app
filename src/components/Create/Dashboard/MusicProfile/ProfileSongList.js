import React from "react";
import { useStoreState } from "easy-peasy";
import { Box, Heading } from "@chakra-ui/react";

import ListOfTracks from "../../../reusable/ListOfTracks";

function ProfileSongList() {
  const savedTrackLists = useStoreState((state) => state.savedTrackLists);
  console.log(savedTrackLists);

  return (
    <Box my={5}>
      <Heading size="lg">Your tracks</Heading>

      {savedTrackLists && (
        <Box py={5}>
          <p>
            These are the songs we will compare against your friend looking for
            matches.
          </p>
          <p>The more songs the better!</p>

          {savedTrackLists[0].theList && (
            <div>
              <p>
                Total songs:{" "}
                <strong>{savedTrackLists[0].theList.length}</strong>
              </p>
            </div>
          )}
          {savedTrackLists[0].theList && (
            <Box display="flex" justifyContent="center">
              <ListOfTracks TrackList={savedTrackLists[0].theList} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ProfileSongList;
