import React, { useEffect } from "react";
import SourcesIndex from "./Sources/SourcesIndex";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";
import Loading from "./Loading";
import StepTwo from "./StepTwo";
import { Button, useToast, Box, Heading } from "@chakra-ui/react";

function ProfileBuilder() {
  //toast
  const toast = useToast();

  //local state

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
      setIsGettingData(true);
    } else {
      console.log("no option selected");
      toast({
        title: "Error!",
        description: "Please select 1 import method!",
        status: "error",
        isClosable: "true",
      });
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
          <Box>
            <Heading mb={5}>Step 1 - Build your profile!</Heading>
            <Button onClick={() => buildProfileHandler()}>
              Click to build!
            </Button>
          </Box>
        </div>
      )}
      <SourcesDiv isGettingData={isGettingData}>
        {!gotAllData && <SourcesIndex />}
      </SourcesDiv>
      {isGettingData && <Loading />}
      {gotAllData && <StepTwo />}
    </div>
  );
}

export default ProfileBuilder;

const SourcesDiv = styled.div`
  display: ${(prop) => (prop.isGettingData ? "none" : "")};
`;
