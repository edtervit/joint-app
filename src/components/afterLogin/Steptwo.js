import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import lemonke from "../../Images/lemonke.jpg";

function Steptwo() {
  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const profile = useStoreState((state) => state.profile);

  //state
  const [failedSaving, setFailedSaving] = useState(false);

  const sendToDbHandler = async (profile, theList) => {
    const name = profile.display_name;
    const id = profile.id;
    const list = theList;
    const newTrackList = {
      name: name,
      theList: list,
      id: id,
    };

    axios
      .post(`${process.env.REACT_APP_BACK_URL}/trackLists/create`, newTrackList)
      .then((response) => {
        if (response.ok) {
          setFailedSaving(false);
          console.log("reponse was good");
          return;
        }
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err.message);
        setFailedSaving(true);
      });
  };

  return (
    <div>
      <button onClick={() => sendToDbHandler(profile, usersSelectedTracks)}>
        Save current tracklist to database.
      </button>
      {failedSaving && (
        <div className="error">
          <p>Uh oh stinky, Failed saving to database</p>{" "}
          <img src={lemonke} alt="" />
        </div>
      )}
    </div>
  );
}

export default Steptwo;
