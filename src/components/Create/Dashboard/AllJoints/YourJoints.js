import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Link, Button, HStack } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";
import Loading from "../../../reusable/Loading";

function YourJoints() {
  const yourJoints = useStoreState((state) => state.yourJoints);
  const profile = useStoreState((state) => state.profile);

  const [forceReload, setForceReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //actions
  const callDB = useStoreActions((actions) => actions.callDB);
  const setYourJoints = useStoreActions((actions) => actions.setYourJoints);

  //handlers

  const deleteJointHandler = async (joint) => {
    const check = window.confirm(
      "You sure you want to delete this joint? \nTHIS IS PERMANENT"
    );

    const payload = {
      url: `/jointplaylist/deleteJointPlaylist/${joint}`,
      method: "DELETE",
    };
    if (check) {
      const res = await callDB(payload);
      setForceReload(true);
      setIsLoading(true);
      console.log(res);
      setForceReload(false);
    }
  };

  useEffect(() => {
    const getYourJoints = async (id) => {
      let payload = {
        url: `/jointPlaylist/getYourJointPlaylists/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);

      if (res && res.length > 0) {
        setYourJoints(res);
        setIsLoading(false);
      } else {
        console.log("Database error or response is empty");
        setIsLoading(false);
      }
    };

    if (profile) {
      getYourJoints(profile.id);
    }

    // eslint-disable-next-line
  }, [profile, forceReload]);

  return (
    <Box my={5}>
      <Heading size="lg" my={3}>
        Joints You Made
      </Heading>
      {yourJoints && <Text my={2}>Click a joint to view it!</Text>}
      {isLoading && <Loading />}
      <Box border="gray.300 1px solid">
        {!yourJoints && !isLoading && (
          <Text>
            You haven't made any joints, get your friends to send your their
            share link!
          </Text>
        )}
        {yourJoints && !isLoading && (
          <Box>
            <Text display="inline-block" w="50%" textAlign="center" pr={5}>
              <strong>Friends Name</strong>
            </Text>
            <Text display="inline-block" w="50%" textAlign="center" pr={10}>
              <strong>List Length</strong>
            </Text>
            {yourJoints.map((joint, index) => (
              <HStack key={joint._id}>
                <Link
                  as={ReactLink}
                  to={`/sharej/${joint._id}`}
                  w="100%"
                  boxShadow={index % 2 === 0 ? "" : "inner"}
                  bg={index % 2 === 0 ? "" : "white"}
                  display="flex"
                  textAlign="center"
                  my={2}
                >
                  <Text w="50%">{joint.userFriendName}</Text>
                  <Text w="50%">{joint.theList.length}</Text>
                </Link>
                <Button
                  onClick={() => deleteJointHandler(joint._id)}
                  size="sml"
                  p={2}
                  bg="red.50"
                >
                  -
                </Button>
              </HStack>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default YourJoints;
