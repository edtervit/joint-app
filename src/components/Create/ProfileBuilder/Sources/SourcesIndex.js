import React from "react";
import TopSongs from "./TopSongs";
import { Box, Heading, Text, Center } from "@chakra-ui/react";
import LikedSongs from "./LikedSongs";

function SourcesIndex() {
  return (
    <Center>
      <Box my={4} py={2} px={10} bg="gray.50" w="max-content" boxShadow="md">
        <Heading my={2} size="md">
          Select where we should get your music from:
        </Heading>
        <Text>The more songs the better! Don't be shy!</Text>
        <Box my={5}>
          <TopSongs />
          <LikedSongs />
        </Box>
      </Box>
    </Center>
  );
}

export default SourcesIndex;
