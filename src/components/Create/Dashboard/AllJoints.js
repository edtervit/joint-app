import React from "react";
import { Box, Heading, Center } from "@chakra-ui/react";
import YourJoints from "./AllJoints/YourJoints";
import OthersJoints from "./AllJoints/OthersJoints";

function AllJoints() {
  return (
    <Center>
      <Box
        bg="gray.50"
        w="75%"
        justifyContent="center"
        borderRadius="lg"
        p={5}
        boxShadow="lg"
      >
        <Heading>View Your Joints Here</Heading>
        <YourJoints />
        <OthersJoints />
      </Box>
    </Center>
  );
}

export default AllJoints;
