import React from "react";
import TopSongs from "./TopSongs";
import { Box, Heading, Text } from "@chakra-ui/react";

function SourcesIndex() {
  return (
    <Box my={4} p={2}>
      <Heading my={2} size="md">
        Select where we should get your music from:
      </Heading>
      <Text>The more songs the better! Don't be shy!</Text>
      <Box my={5}>
        <TopSongs />
      </Box>
    </Box>
  );
}

export default SourcesIndex;
