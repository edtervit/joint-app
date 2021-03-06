import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { Heading, Center } from "@chakra-ui/react";
import lemonke from "../../Images/lemonke.jpg";
import SaveJointPlaylist from "./SaveJointPlaylist";
import Loading from "../reusable/Loading";

function JointList() {
  //normal state
  const [jointListIsEmpty, setJointListIsEmpty] = useState(false);

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);

  useEffect(() => {
    if (jointList && jointList.theList && jointList.theList.length === 0) {
      setJointListIsEmpty(true);
    }
  }, [jointList]);

  return (
    <div className="bg-gradient-to-r from-purple-light to-orange flex flex-col min-h-screen items-center nav-pad">
      {jointList && jointList.theList.length > 0 && <SaveJointPlaylist />}
      {jointList && !jointListIsEmpty && <Loading />}
      {jointList && jointListIsEmpty && (
        <>
          <Heading size="lg" my={3} px="20%">
            Uh oh! Looks like you and {jointList.userFriendName} don't have
            anything in common!
          </Heading>
          <Center my={3}>
            <img src={lemonke} alt="le monke, monkey with a cigarette" />
          </Center>
          <p>
            You or {jointList.userFriendName} might need to re-create their
            profile to have more songs{" "}
          </p>
          <p>or maybe its just not meant to be...</p>
        </>
      )}
    </div>
  );
}

export default JointList;
