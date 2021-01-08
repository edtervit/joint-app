import React from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

function Profile() {
  const profile = useStoreState((state) => state.profile);

  return (
    <div className="profileDiv">
      <ProfileDiv>
        {profile.images.length > 0 && profile.images[0].url && (
          <img src={profile.images[0].url} alt="" />
        )}
        <h2>You're logged in, Hi {profile.display_name}!</h2>
      </ProfileDiv>
    </div>
  );
}

export default Profile;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  h2 {
    margin: 0;
  }
  img {
    height: 75px;
    width: 75px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }
`;
