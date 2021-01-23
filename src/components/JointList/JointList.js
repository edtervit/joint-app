import React from "react";
import { useStoreState } from "easy-peasy";
import { Box, Heading, Center } from "@chakra-ui/react";
import lemonke from "../../Images/lemonke.jpg";
import SaveJointPlaylist from "./SaveJointPlaylist";

function JointList() {
  //normal state

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);
  return (
    <Box my={5}>
      {jointList && jointList.theList.length > 0 && <SaveJointPlaylist />}
      <Heading size="lg" my={3} px="20%">
        Uh oh! Looks like you and {jointList.userFriendName} don't have anything
        in common!
      </Heading>
      <Center my={3}>
        <img src={lemonke} alt="le monke, monkey with a cigarette" />
      </Center>
      <p>
        You or {jointList.userFriendName} might need to re-create their profile
        to have more songs{" "}
      </p>
      <p>or maybe its just not meant to be...</p>
    </Box>
  );
}

export default JointList;
