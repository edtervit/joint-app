import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import SaveProfileToDB from "./SaveProfileToDB";
import {
  Box,
  Button,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
} from "@chakra-ui/react";
import styled from "styled-components";

function StepTwo() {
  //Local state

  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const clearList = useStoreActions((action) => action.clearList);

  return (
    <Box>
      <Heading mb={5}>Step 2 - Review your profile!</Heading>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button bg="red.100" mx={4} onClick={() => clearList()}>
          😡 Not happy? Go Back and rebuild
        </Button>
        {usersSelectedTracks && <SaveProfileToDB />}
      </Box>

      <TL>
        <Heading size="md">Your Profile</Heading>
        <p>
          These are the songs we will compare against your friend looking for
          matches.
        </p>

        {usersSelectedTracks && (
          <div>
            <p>
              Total songs: <strong>{usersSelectedTracks.length}</strong>
            </p>
          </div>
        )}
        <Accordion
          allowMultiple
          allowToggle
          bg="gray.50"
          display="flex"
          borderColor="gray.50"
          defaultIndex={[0]}
        >
          <AccordionItem w="100%">
            <Center>
              <AccordionButton w="max-content">
                <Box>Your Songs</Box>
                <AccordionIcon />
              </AccordionButton>
            </Center>
            <AccordionPanel>
              <div className="songs">
                {usersSelectedTracks ? (
                  usersSelectedTracks.map((track) => (
                    <div className="aTrack-cont" key={track.uri}>
                      <div className="aTrack">
                        <img src={track.image} alt="" />
                        <p>
                          <strong>{track.name}</strong> by {track.artist}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="">
                    <h4>You haven't selected any tracks yet!</h4>
                    <p>Refresh your page and try creating a profile again.</p>
                  </div>
                )}
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </TL>
    </Box>
  );
}

export default StepTwo;

const TL = styled.div`
  padding: 1.5rem 0;
  p {
    margin: 0.5rem 0;
  }
  .songs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    .aTrack-cont {
      width: 100%;
      .aTrack {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;
        margin: 0 auto;
        img {
          width: 75px;
        }
      }
    }
  }
`;
