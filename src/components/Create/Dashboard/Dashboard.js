import React from "react";
import AllJoints from "./AllJoints";
import QuickLinks from "./QuickLinks";
import { Box, Heading } from "@chakra-ui/react";

function Dashboard() {
  return (
    <Box>
      <Heading>Dashboard </Heading>
      <QuickLinks />
      <AllJoints />
    </Box>
  );
}

export default Dashboard;
