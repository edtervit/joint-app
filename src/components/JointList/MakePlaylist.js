import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Button, Box } from "@chakra-ui/react";

function MakePlaylist() {
  // local state
  const [failedCreating, setFailedCreating] = useState(false);
  const [passedCreating, setPassedcreating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);
  let token = useStoreState((state) => state.token);
  let profile = useStoreState((state) => state.profile);

  //easy peasy actions
  const postAPI = useStoreActions((actions) => actions.postAPI);
  const setToken = useStoreActions((actions) => actions.setToken);
  const failCookie = useStoreActions((actions) => actions.failCookie);

  //handlers
  const createJointPlaylist = async () => {
    setIsCreating(true);
    //create the empty playlist
    const payload = {
      token: "CHANGEMEEEE",
      url: `https://api.spotify.com/v1/users/${profile.id}/playlists`,
      body: {
        name: ` 🍁 ${jointList.userFriendName}'s and ${jointList.userCreatorName}'s joint list`,
        description: "Playlist created at jointplaylist.com!",
      },
    };
    const res = await postAPI(payload);
    // if (res.error && res.error.message === "Invalid access token") {
    //   console.log("invalid token");
    //   const cookieRes = await resetCookie();
    //   console.log(cookieRes);
    // }
    if (res) {
      console.log(res);
      if (!res.id) {
        setFailedCreating(true);
        setIsCreating(false);
      } else {
        //id of playlist to add songs to
        const playlistID = res.id;

        let songArray = [];
        //get songs uris
        jointList.theList.forEach((song) => {
          songArray.push(song.uri);
        });

        let res2 = { snapshot_id: 1337 };

        let counterBase = 0;
        let counterEnd = 100;

        while (res2.snapshot_id) {
          let payload3 = {
            token: token,
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            body: {
              uris: songArray.slice(counterBase, counterEnd),
            },
          };
          console.log(songArray.slice(counterBase, counterEnd));
          res2 = await postAPI(payload3);
          console.log(res2);
          counterBase += 100;
          counterEnd += 100;
        }
        setPassedcreating(true);
        setFailedCreating(false);
        setIsCreating(false);
      }
    }
  };

  return (
    <div>
      {!passedCreating && (
        <Box>
          <Button onClick={() => setToken(null)}>Clear token</Button>
          <Button
            isLoading={isCreating ? true : false}
            onClick={() => createJointPlaylist()}
          >
            Save playlist to my spotify
          </Button>
        </Box>
      )}
      {failedCreating && (
        <p>
          {" "}
          UH OH STINKY, FAILED CREATING PLAYLIST! Try clicking your friends link
          again.{" "}
        </p>
      )}
      {passedCreating && (
        <p>Creating succesful! Check your spotify for your new playlist!</p>
      )}
    </div>
  );
}

export default MakePlaylist;
