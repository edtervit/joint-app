import React from "react";
import AllJoints from "./AllJoints";
import QuickLinks from "./QuickLinks";
import { Box, Heading } from "@chakra-ui/react";
import QuickShareLink from "./QuickShareLink";
import { useStoreState } from "easy-peasy";
import RefreshTokenTest from "./RefreshTokenTest";

function Dashboard() {
  const profile = useStoreState((state) => state.profile);

  return (
    <Box>
      <RefreshTokenTest />
      <Heading size="xl">Hi {profile.display_name}! </Heading>
      <Heading size="xl"> Welcome to your Dashboard.</Heading>
      <QuickShareLink />
      <QuickLinks />
      <AllJoints />
    </Box>
  );
}

export default Dashboard;
