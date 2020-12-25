import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";

function SaveJointPlaylist() {
  // local state
  const [failedCreating, setFailedCreating] = useState(false);
  const [passedCreating, setPassedcreating] = useState(false);

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);

  //handlers
  const saveJointPlaylistHandler = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACK_URL}/jointplaylist/create`, jointList)
      .then((response) => {
        if (response) {
          setFailedCreating(false);
          setPassedcreating(true);
          console.log("reponse was good");
        }
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err.message);
        setFailedCreating(true);
      });
  };

  return (
    <div>
      {!passedCreating && (
        <button onClick={() => saveJointPlaylistHandler()}>
          Click here to save to DB
        </button>
      )}
      {failedCreating && <p> UH OH STINKY, FAILED SAVING PLAYLIST. </p>}
      {passedCreating && <p>Playlist saved succesfully!</p>}
    </div>
  );
}

export default SaveJointPlaylist;
