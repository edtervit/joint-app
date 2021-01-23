import React, { useEffect } from "react";
import SourcesIndex from "./Sources/SourcesIndex";
import { useStoreActions, useStoreState } from "easy-peasy";
import Loading from "./Loading";
import StepTwo from "./Steptwo";
import { Button, useToast, Box, Heading } from "@chakra-ui/react";

function ProfileBuilder() {
  //toast
  const toast = useToast();

  //local state

  const isGettingData = useStoreState((state) => state.isGettingData);
  const setIsGettingData = useStoreActions(
    (actions) => actions.setIsGettingData
  );

  const setGotAllData = useStoreActions((actions) => actions.setGotAllData);
  const gotAllData = useStoreState((state) => state.gotAllData);

  //TopSongs
  const gotTopSongs = useStoreState((state) => state.gotTopSongs);
  const noTopSongsSelected = useStoreState((state) => state.noTopSongsSelected);

  //LikedSongs
  const gotLikedSongs = useStoreState((state) => state.gotLikedSongs);
  const noLikedSongsSelected = useStoreState(
    (state) => state.noLikedSongsSelected
  );

  //Handlers
  const buildProfileHandler = () => {
    //checks to see if no sources are selected
    if (!noTopSongsSelected || !noLikedSongsSelected) {
      setIsGettingData(true);
    } else {
      console.log("no option selected");
      toast({
        title: "Error!",
        description: "Please select 1 import method!",
        status: "error",
        isClosable: "true",
      });
    }
  };

  //checks to see if all the sources have completed
  //add new sources here
  useEffect(() => {
    if (gotTopSongs && gotLikedSongs) {
      setGotAllData(true);
      setIsGettingData(false);
    }
    return () => {};
    // eslint-disable-next-line
  }, [gotTopSongs]);

  return (
    <div>
      {!isGettingData && !gotAllData && (
        <div className="div">
          <Box>
            <Heading mb={5}>Step 1 - Build your profile!</Heading>
            <Button onClick={() => buildProfileHandler()}>
              Click to build!
            </Button>
          </Box>
        </div>
      )}

      <Box display={isGettingData ? "none" : ""}>
        {!gotAllData && <SourcesIndex />}
      </Box>
      {isGettingData && <Loading />}
      {gotAllData && <StepTwo />}
    </div>
  );
}

export default ProfileBuilder;
