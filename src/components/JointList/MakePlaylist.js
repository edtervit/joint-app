import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

function MakePlaylist() {
  // local state
  const [failedCreating, setFailedCreating] = useState(false);
  const [passedCreating, setPassedcreating] = useState(false);

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);
  let token = useStoreState((state) => state.token);
  let profile = useStoreState((state) => state.profile);

  //easy peasy actions
  const postAPI = useStoreActions((actions) => actions.postAPI);

  //handlers
  const createJointPlaylist = async () => {
    //create the empty playlist
    const payload = {
      token: token,
      url: `https://api.spotify.com/v1/users/${profile.id}/playlists`,
      body: {
        name: ` 🍁 ${jointList.userFriendName}'s and ${jointList.userCreatorName}'s joint list`,
        description: "Playlist created at jointplaylist.com!",
      },
    };
    const res = await postAPI(payload);
    console.log(res);
    if (!res.id) {
      setFailedCreating(true);
    } else {
      /// add songs to the playlist ///
      const playlistID = res.id;
      //convert list of songs
      const songArray = [];
      jointList.theList.slice(0, 100).forEach((song) => {
        songArray.push(song.uri);
      });
      console.log(songArray);

      const payload2 = {
        token: token,
        url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        body: {
          uris: songArray,
        },
      };
      const res2 = await postAPI(payload2);
      console.log(res2);
      if (res2.snapshot_id) {
        console.log("ADDED SONGS!");
        setPassedcreating(true);
        setFailedCreating(false);
      } else {
        console.log("failed to add songs");
        setFailedCreating(true);
      }
    }
  };

  return (
    <div>
      {!passedCreating && (
        <button onClick={() => createJointPlaylist()}>
          Save playlist to my spotify
        </button>
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
