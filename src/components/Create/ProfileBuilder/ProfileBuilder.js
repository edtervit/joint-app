import React, { useEffect } from "react";
import SourcesIndex from "./Sources/SourcesIndex";
import { useStoreActions, useStoreState } from "easy-peasy";
import Loading from "../../reusable/Loading";
import StepTwo from "./Steptwo";
import { Button, useToast, Box, Heading } from "@chakra-ui/react";

function ProfileBuilder() {
  //toast
  const toast = useToast();
  const isGuest = useStoreState((state) => state.isGuest);
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

  //Playlists
  const gotPlaylists = useStoreState((state) => state.gotPlaylists);
  const noPlaylistsSelected = useStoreState(
    (state) => state.noPlaylistsSelected
  );

  //Handlers
  const buildProfileHandler = () => {
    //checks to see if no sources are selected
    if (!noTopSongsSelected || !noLikedSongsSelected || !noPlaylistsSelected) {
      setIsGettingData(true);
    } else {
      console.log("no option selected");
      toast({
        title: "Error!",
        description: "Please select atleast 1 import method!",
        status: "error",
        isClosable: "true",
      });
    }
  };

  //checks to see if all the sources have completed
  //add new sources here
  useEffect(() => {
    if (gotTopSongs && gotLikedSongs && gotPlaylists) {
      setGotAllData(true);
      setIsGettingData(false);
    }
    return () => {};
    // eslint-disable-next-line
  }, [gotTopSongs, gotLikedSongs, gotPlaylists]);

  //if user is a guest show them a popup
  useEffect(() => {
    if (isGuest) {
      toast({
        position: "bottom",
        title: "Hi Guest!",
        description:
          "If you have a spotify account I reccomend just trying the app out for yourself. As a guest some features are disabled.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!isGettingData && !gotAllData && (
        <div className="div">
          <Box>
            <Heading mb={5}>Step 1 - Build your profile!</Heading>
          </Box>
        </div>
      )}
      {!isGettingData && !gotAllData && (
        <Button size="lg" onClick={() => buildProfileHandler()}>
          {" "}
          Click to build!
        </Button>
      )}

      <Box display={isGettingData ? "none" : ""}>
        {!gotAllData && <SourcesIndex />}
      </Box>
      {isGettingData && <Loading importSongs={true} />}
      {gotAllData && <StepTwo />}
    </div>
  );
}

export default ProfileBuilder;
