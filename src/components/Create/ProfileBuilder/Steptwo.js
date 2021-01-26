import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import SaveProfileToDB from "./SaveProfileToDB";
import { Box, Button, Heading, Center, Image, Text } from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";

function StepTwo() {
  //Local state

  const [amount, setAmount] = useState(20);

  const loadMore = () => {
    setAmount(amount + 20);
    console.log("loading more");
  };

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
        <Center>
          <Box
            bg="gray.50"
            display="flex"
            borderColor="gray.50"
            defaultIndex={[0]}
            w="100%"
            borderRadius={5}
            p={2}
          >
            <Box
              className="songs"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
            >
              {usersSelectedTracks ? (
                <InfiniteScroll
                  dataLength={usersSelectedTracks.slice(0, amount).length}
                  next={() => loadMore()}
                  hasMore={true}
                >
                  {usersSelectedTracks.slice(0, amount).map((track, index) => (
                    <Box w="100%" key={track.uri}>
                      <Center>
                        <Box
                          className="aTrack"
                          my={2}
                          width="75%"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text>
                            <strong>
                              {index + 1}. {track.name}
                            </strong>{" "}
                            by {track.artist}
                          </Text>
                          <Image
                            objectFit="cover"
                            src={track.image}
                            alt="album cover of track"
                            w="100px"
                            h="100px"
                          />
                        </Box>
                      </Center>
                    </Box>
                  ))}
                </InfiniteScroll>
              ) : (
                <div className="">
                  <h4>You haven't selected any tracks yet!</h4>
                  <p>Refresh your page and try creating a profile again.</p>
                </div>
              )}
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
}

export default StepTwo;
