import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import { Box, Heading, Center, Image, Text } from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";

function ProfileSongList() {
  const savedTrackLists = useStoreState((state) => state.savedTrackLists);
  console.log(savedTrackLists);

  //react state

  const [amount, setAmount] = useState(20);

  const loadMore = () => {
    // if (amount < savedTrackLists[0].theList.length) {
    setAmount(amount + 20);
    console.log("loading more");
    // }
  };

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
                {savedTrackLists[0].theList ? (
                  <InfiniteScroll
                    dataLength={
                      savedTrackLists[0].theList.slice(0, amount).length
                    }
                    next={() => loadMore()}
                    hasMore={true}
                  >
                    {savedTrackLists[0].theList
                      .slice(0, amount)
                      .map((track, index) => (
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
      )}
    </Box>
  );
}

export default ProfileSongList;
