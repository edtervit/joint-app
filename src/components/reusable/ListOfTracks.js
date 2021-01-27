import React, { useState } from "react";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

function ListOfTracks(props) {
  const [amount, setAmount] = useState(20);

  const loadMore = () => {
    setAmount(amount + 20);
    console.log("loading more");
  };

  return (
    <Center>
      <Box
        bg="gray.50"
        display="flex"
        borderColor="gray.50"
        defaultIndex={[0]}
        w="100%"
        borderRadius={5}
        p={2}
        justifyContent="center"
      >
        <Box
          className="songs"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
        >
          {props.TrackList ? (
            <InfiniteScroll
              dataLength={props.TrackList.slice(0, amount).length}
              next={() => loadMore()}
              hasMore={true}
            >
              {props.TrackList.slice(0, amount).map((track, index) => (
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
                      <Text textAlign="left">
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
  );
}

export default ListOfTracks;
