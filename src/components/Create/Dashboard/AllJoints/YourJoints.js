import React, { useEffect } from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";

function YourJoints() {
  const yourJoints = useStoreState((state) => state.yourJoints);
  const profile = useStoreState((state) => state.profile);

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
      } else {
        console.log("Database error or response is empty");
      }
    };

    if (profile) {
      getYourJoints(profile.id);
    }

    // eslint-disable-next-line
  }, [profile]);

  return (
    <div>
      <Heading size="md" my={2}>
        Joints You Made
      </Heading>
      <Box>
        {!yourJoints && (
          <Text>
            You haven't made any joints, get your friends to send your their
            share link!
          </Text>
        )}
        {yourJoints && (
          <Box>
            {yourJoints.map((joint, index) => (
              <Link
                as={ReactLink}
                to={`/sharej/${joint._id}`}
                w="100%"
                key={joint._id}
                boxShadow={index % 2 === 0 ? "" : "inner"}
                bg={index % 2 === 0 ? "" : "white"}
                display="flex"
                textAlign="left"
              >
                <Text w="33%">Friend: {joint.userFriendName}</Text>
                <Text w="33%">List Length: {joint.theList.length}</Text>
                <Text w="33%">
                  Created: {joint.createdAt.slice(0, -14)} at{" "}
                  {joint.createdAt.slice(11, 16)}
                </Text>
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default YourJoints;
