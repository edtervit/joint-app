import React from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";

function Steptwo() {
  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const profile = useStoreState((state) => state.profile);

  const sendToDbHandler = (profile, theList) => {
    const name = profile.display_name;
    const id = profile.id;
    const list = theList;
    const newProfile = {
      name: name,
      theList: list,
      id: id,
    };

    axios.post(`${process.env.REACT_APP_BACK_URL}/create`, newProfile);
    console.log("Sent the profile to database, hopefuly...");
  };

  return (
    <div>
      <button onClick={() => sendToDbHandler(profile, usersSelectedTracks)}>
        Send to DB
      </button>
    </div>
  );
}

export default Steptwo;
