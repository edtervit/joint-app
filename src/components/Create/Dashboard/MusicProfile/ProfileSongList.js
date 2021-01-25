import React from "react";
import { useStoreState } from "easy-peasy";
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  Center,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Image,
  Text,
} from "@chakra-ui/react";

function ProfileSongList() {
  const savedTrackLists = useStoreState((state) => state.savedTrackLists);

  return (
    <Box my={5}>
      <Heading size="lg">Your tracks</Heading>
      {savedTrackLists && (
        <Box py={5}>
          <p>
            These are the songs we will compare against your friend looking for
            matches.
          </p>
          <p>The more songs the better!</p>

          {savedTrackLists[0].theList && (
            <div>
              <p>
                Total songs:{" "}
                <strong>{savedTrackLists[0].theList.length}</strong>
              </p>
            </div>
          )}
          <Center>
            <Accordion
              allowMultiple
              allowToggle
              bg="gray.50"
              display="flex"
              borderColor="gray.50"
              defaultIndex={[0]}
              w="100%"
              borderRadius={5}
              p={2}
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
                    {savedTrackLists[0].theList ? (
                      savedTrackLists[0].theList.map((track, id) => (
                        <Box width="100%">
                          <Center>
                            <Box
                              className="aTrack"
                              my={2}
                              width="50%"
                              key={track.uri}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              {savedTrackLists[0].theList.length < 1000 && (
                                <Image
                                  boxSize="100px"
                                  src={track.image}
                                  alt=""
                                  mx={5}
                                />
                              )}

                              <Text
                                textAlign={
                                  savedTrackLists[0].theList.length < 1000
                                    ? "right"
                                    : "left"
                                }
                              >
                                <strong>
                                  {id + 1}. {track.name}
                                </strong>{" "}
                                by {track.artist}
                              </Text>
                            </Box>
                          </Center>
                        </Box>
                      ))
                    ) : (
                      <div className="">
                        <h4>You haven't selected any tracks yet!</h4>
                        <p>
                          Refresh your page and try creating a profile again.
                        </p>
                      </div>
                    )}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Center>
        </Box>
      )}
    </Box>
  );
}

export default ProfileSongList;
