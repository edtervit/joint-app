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
  Image,
} from "@chakra-ui/react";

function StepTwo() {
  //Local state

  let usersSelectedTracks = useStoreState((state) => state.usersSelectedTracks);
  const clearList = useStoreActions((action) => action.clearList);

  return (
    <>
      <Heading mb={5}>Step 2 - Review your profile!</Heading>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <Button bg="red.100" m={4} onClick={() => clearList()}>
          😡 Not happy? Go Back and rebuild
        </Button>
        {usersSelectedTracks && <SaveProfileToDB />}
      </Box>
      <Box py={5}>
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
              <Box
                className="songs"
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
              >
                {usersSelectedTracks ? (
                  usersSelectedTracks.map((track) => (
                    <Box width="100%">
                      <Center>
                        <Box
                          className="aTrack"
                          my={4}
                          width="50%"
                          key={track.uri}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Image
                            boxSize="100px"
                            src={track.image}
                            alt=""
                            mx={5}
                          />

                          <p>
                            <strong>{track.name}</strong> by {track.artist}
                          </p>
                        </Box>
                      </Center>
                    </Box>
                  ))
                ) : (
                  <div className="">
                    <h4>You haven't selected any tracks yet!</h4>
                    <p>Refresh your page and try creating a profile again.</p>
                  </div>
                )}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
}

export default StepTwo;
