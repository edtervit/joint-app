import React, { useEffect } from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";

function OthersJoints() {
  const friendsJoints = useStoreState((state) => state.friendsJoints);
  const profile = useStoreState((state) => state.profile);

  //actions
  const callDB = useStoreActions((actions) => actions.callDB);
  const setFriendsJoints = useStoreActions(
    (actions) => actions.setFriendsJoints
  );

  useEffect(() => {
    const getFriendsJoints = async (id) => {
      let payload = {
        url: `/jointPlaylist/getFriendJointPlaylists/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);
      if (res && res.length > 0) {
        setFriendsJoints(res);
      } else {
        console.log("Database error or response is empty");
      }
    };

    if (profile) {
      getFriendsJoints(profile.id);
    }

    // eslint-disable-next-line
  }, [profile]);

  return (
    <Box>
      <Heading size="md" my={2}>
        Joints others have made with you
      </Heading>
      <Box>
        {!friendsJoints && (
          <Text>
            Nothing here 🙄, send your share link to friends and check back!{" "}
          </Text>
        )}
        {friendsJoints && (
          <Box>
            {friendsJoints.map((joint, index) => (
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
    </Box>
  );
}

export default OthersJoints;
