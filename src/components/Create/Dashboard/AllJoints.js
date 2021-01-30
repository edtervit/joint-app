import React from "react";
import { Box, Center } from "@chakra-ui/react";
import YourJoints from "./AllJoints/YourJoints";
import OthersJoints from "./AllJoints/OthersJoints";

function AllJoints() {
  return (
    <Center>
      <Box
        bg="gray.50"
        w={["95%", "60%"]}
        justifyContent="center"
        borderRadius="lg"
        p={4}
        my={3}
        boxShadow="lg"
      >
        <YourJoints />
        <OthersJoints />
      </Box>
    </Center>
  );
}

export default AllJoints;
