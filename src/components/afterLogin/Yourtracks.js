import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

function Yourtracks() {
  //Local state
  const [toggleList, setToggleList] = useState(false);
  const usersSelectedTracks = useStoreState(
    (state) => state.usersSelectedTracks
  );

  return (
    <TLdiv>
      <h2>Current track list</h2>
      <p>
        These are the songs we will compare against your friend looking for
        matches.
      </p>
      <button onClick={() => setToggleList(!toggleList)}>show/hide</button>
      {toggleList && (
        <div className="songs">
          {usersSelectedTracks ? (
            <h2>your tracks here</h2>
          ) : (
            <h4>You haven't selected any tracks yet!</h4>
          )}
        </div>
      )}
    </TLdiv>
  );
}

export default Yourtracks;

const TLdiv = styled.div`
  background-color: #fafafa;
  padding: 1.5rem 0;
`;
