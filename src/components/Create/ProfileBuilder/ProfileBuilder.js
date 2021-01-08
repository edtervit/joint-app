import React, { useEffect, useState } from "react";
import SourcesIndex from "./Sources/SourcesIndex";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";
import Loading from "./Loading";
import Yourtracks from "./Yourtracks";
import { Button } from "@chakra-ui/react";

function ProfileBuilder() {
  //local state
  const [nothingSelectedError, setNothingSelectedError] = useState(false);

  const isGettingData = useStoreState((state) => state.isGettingData);
  const setIsGettingData = useStoreActions(
    (actions) => actions.setIsGettingData
  );

  const noTopSongsSelected = useStoreState((state) => state.noTopSongsSelected);
  const setGotAllData = useStoreActions((actions) => actions.setGotAllData);
  const gotAllData = useStoreState((state) => state.gotAllData);

  //TopSongs
  const gotTopSongs = useStoreState((state) => state.gotTopSongs);

  //Handlers
  const buildProfileHandler = () => {
    if (!noTopSongsSelected) {
      setNothingSelectedError(false);
      setIsGettingData(true);
    } else {
      console.log("no option selected");
      setNothingSelectedError(true);
    }
  };

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
        <div className="div">
          <Button onClick={() => buildProfileHandler()}>Build Profile</Button>
          {nothingSelectedError && (
            <p>Error please select 1 import method below</p>
          )}
        </div>
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
