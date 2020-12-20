import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import axios from "axios";
import lemonke from "../../Images/lemonke.jpg";

function Steptwo() {
  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const profile = useStoreState((state) => state.profile);
  const amountOfSavedTrackLists = useStoreState(
    (state) => state.amountOfSavedTrackLists
  );
  const setHasSavedTrackLists = useStoreActions(
    (action) => action.setHasSavedTrackLists
  );
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

    await axios
      .post(`${process.env.REACT_APP_BACK_URL}/trackLists/create`, newTrackList)
      .then((response) => {
        if (response) {
          setFailedSaving(false);
          setHasSavedTrackLists(false);
          setHasSavedTrackLists(true);
          console.log("reponse was good");
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
      {amountOfSavedTrackLists < 3 && (
        <button onClick={() => sendToDbHandler(profile, usersSelectedTracks)}>
          Save current tracklist to database.
        </button>
      )}

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
