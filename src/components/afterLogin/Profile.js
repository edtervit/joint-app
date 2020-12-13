import React from "react";

function Profile({ profile }) {
  return (
    <div>
      <h2>You're logged in, Hi {profile.display_name}!</h2>
      {profile.images[0].url && <img src={profile.images[0].url} alt="" />}
    </div>
  );
}

export default Profile;
