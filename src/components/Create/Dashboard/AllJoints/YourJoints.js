import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";
import Loading from "../../../reusable/Loading";

function YourJoints() {
  const yourJoints = useStoreState((state) => state.yourJoints);
  const profile = useStoreState((state) => state.profile);

  const [isLoading, setIsLoading] = useState(true);

  //actions
  const callDB = useStoreActions((actions) => actions.callDB);
  const setYourJoints = useStoreActions((actions) => actions.setYourJoints);

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
  }, [profile]);

  return (
    <Box my={5}>
      <Heading size="lg" my={3}>
        Joints You Made
      </Heading>
      {yourJoints && <Text my={2}>Click a joint to view it!</Text>}
      {isLoading && !yourJoints && <Loading />}
      <Box border="gray.300 1px solid">
        {!yourJoints && !isLoading && (
          <Text>
            You haven't made any joints, get your friends to send your their
            share link!
          </Text>
        )}
        {yourJoints && (
          <Box>
            <Text display="inline-block" w="50%" textAlign="center">
              <strong>Friends Name</strong>
            </Text>
            <Text display="inline-block" w="50%" textAlign="center">
              <strong>List Length</strong>
            </Text>
            {yourJoints.map((joint, index) => (
              <Link
                as={ReactLink}
                to={`/sharej/${joint._id}`}
                w="100%"
                key={joint._id}
                boxShadow={index % 2 === 0 ? "" : "inner"}
                bg={index % 2 === 0 ? "" : "white"}
                display="flex"
                textAlign="center"
              >
                <Text w="50%">{joint.userFriendName}</Text>
                <Text w="50%">{joint.theList.length}</Text>
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default YourJoints;
