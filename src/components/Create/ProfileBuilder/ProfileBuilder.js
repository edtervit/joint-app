import React, { useEffect } from "react";
import SourcesIndex from "./Sources/SourcesIndex";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";
import Loading from "./Loading";
import Yourtracks from "./Yourtracks";

function ProfileBuilder() {
  const isGettingData = useStoreState((state) => state.isGettingData);
  const setIsGettingData = useStoreActions(
    (actions) => actions.setIsGettingData
  );
  const setGotAllData = useStoreActions((actions) => actions.setGotAllData);
  const gotAllData = useStoreState((state) => state.gotAllData);

  //TopSongs
  const gotTopSongs = useStoreState((state) => state.gotTopSongs);

  //checks to see if all the sources have completed
  //add new sources here
  useEffect(() => {
    if (gotTopSongs) {
      setGotAllData(true);
      setIsGettingData(false);
    }
    return () => {};
    // eslint-disable-next-line
  }, [gotTopSongs]);

  return (
    <div>
      {!isGettingData && !gotAllData && (
        <button onClick={() => setIsGettingData(true)}>Build Profile</button>
      )}
      <SourcesDiv isGettingData={isGettingData}>
        {!gotAllData && <SourcesIndex />}
      </SourcesDiv>
      {isGettingData && <Loading />}
      {gotAllData && <Yourtracks />}
    </div>
  );
}

export default ProfileBuilder;

const SourcesDiv = styled.div`
  display: ${(prop) => (prop.isGettingData ? "none" : "")};
`;
