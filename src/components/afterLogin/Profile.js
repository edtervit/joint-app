import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

function Profile() {
  const profile = useStoreState((state) => state.profile);
  const logOut = useStoreActions((actions) => actions.logOut);
  const getProfile = useStoreActions((actions) => actions.getProfile);
  return (
    <div>
      <h2>You're logged in, Hi {profile.display_name}!</h2>
      {profile.images[0].url && <img src={profile.images[0].url} alt="" />}
      <br />
      <button onClick={() => logOut()}>Logout</button>
      <button onClick={() => getProfile()}>get profile again</button>
    </div>
  );
}

export default Profile;
