import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

function Profile() {
  const profile = useStoreState((state) => state.profile);
  const logOut = useStoreActions((actions) => actions.logOut);
  return (
    <div className="profileDiv">
      <ProfileDiv>
        <p className="logout" onClick={() => logOut()}>
          Logout
        </p>
        {profile.images.length > 0 && profile.images[0].url && (
          <img src={profile.images[0].url} alt="" />
        )}
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
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 20px;
  }
`;
