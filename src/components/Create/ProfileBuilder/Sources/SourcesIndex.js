import React from "react";
import TopSongs from "./TopSongs";
import LikedSongs from "./LikedSongs";
import Playlists from "./Playlists";
import { useToast } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "easy-peasy";

function SourcesIndex() {
  //toast
  const toast = useToast();

  //checks to see if nothings selected
  const noTopSongsSelected = useStoreState((state) => state.noTopSongsSelected);
  const noLikedSongsSelected = useStoreState(
    (state) => state.noLikedSongsSelected
  );
  const noPlaylistsSelected = useStoreState(
    (state) => state.noPlaylistsSelected
  );

  const setIsGettingData = useStoreActions(
    (actions) => actions.setIsGettingData
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

  return (
    <div className="cont w-11/12 md:w-full max-w-lg background bg-black bg-opacity-30 rounded-2xl shadow-2xl p-4 md:p-8 mb-4">
      <h1 className="text-2xl font-bold md:px-4">
        Select where we should get your music from
      </h1>
      <div className="my-4">
        <TopSongs />
        <LikedSongs />
        <Playlists />
      </div>
      <button
        className="btn w-max mx-auto"
        onClick={() => buildProfileHandler()}
      >
        Build
      </button>
    </div>
  );
}

export default SourcesIndex;
