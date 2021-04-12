import React, { useEffect } from "react";
import SourcesIndex from "./Sources/SourcesIndex";
import { useStoreActions, useStoreState } from "easy-peasy";
import Loading from "../../reusable/Loading";
import StepTwo from "./Steptwo";
import { useToast } from "@chakra-ui/react";

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

  //LikedSongs
  const gotLikedSongs = useStoreState((state) => state.gotLikedSongs);

  //Playlists
  const gotPlaylists = useStoreState((state) => state.gotPlaylists);

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
    <div className="bg-gradient-to-r from-purple-light to-orange flex flex-col min-h-screen items-center nav-pad">
      {!isGettingData && !gotAllData && (
        <div className="div">
          <div className="cont">
            <h1 className="title my-4">Step 1: Build your profile</h1>
            <p>
              We will only show people the songs you match on. The more songs
              the better! Don't be shy!
            </p>
          </div>
        </div>
      )}

      <div className={isGettingData ? "hidden" : ""}>
        {!gotAllData && <SourcesIndex />}
      </div>
      {isGettingData && <Loading importSongs={true} />}
      {gotAllData && <StepTwo />}
    </div>
  );
}

export default ProfileBuilder;
