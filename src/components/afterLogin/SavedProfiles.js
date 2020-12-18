import React, { useState } from "react";

import { useStoreState } from "easy-peasy";

function SavedProfiles() {
  //state
  const [gotProfiles, setGotProfiles] = useState(null);

  let profile = useStoreState((state) => state.profile);

  const getProfilesHandler = (id) => {
    fetch(`${process.env.REACT_APP_BACK_URL}/getProfiles/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("couldn't get profiles");
        }
      })
      .then((res) => setGotProfiles(res));
  };
  return (
    <div>
      <button onClick={() => getProfilesHandler(profile.id)}>
        Get saved profiles
      </button>
      {gotProfiles && (
        <div className="gotProfiles">
          {gotProfiles.map((profile) => {
            return (
              <div className="aProfile">
                <p>
                  Your name is {profile.name}, your id is {profile.id} and the
                  unique id for this profile is {profile._id}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SavedProfiles;
