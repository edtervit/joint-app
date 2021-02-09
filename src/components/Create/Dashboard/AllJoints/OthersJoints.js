import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";
import Loading from "../../../reusable/Loading";

function OthersJoints() {
  const friendsJoints = useStoreState((state) => state.friendsJoints);
  const profile = useStoreState((state) => state.profile);

  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } else {
        console.log("Database error or response is empty");
        setIsLoading(false);
      }
    };

    if (profile) {
      getFriendsJoints(profile.id);
    }

    // eslint-disable-next-line
  }, [profile]);

  return (
    <Box my={5}>
      <Heading size="lg" my={3}>
        Joints others have made with you
      </Heading>
      <Box>
        {isLoading && <Loading />}
        {!friendsJoints && !isLoading && (
          <Text>
            Nothing here 🙄, send your share link to friends and check back!{" "}
          </Text>
        )}
        {friendsJoints && (
          <Box>
            <Text display="inline-block" w="50%" textAlign="center">
              <strong>Friends Name</strong>
            </Text>
            <Text display="inline-block" w="50%" textAlign="center">
              <strong>List Length</strong>
            </Text>

            {friendsJoints.map((joint, index) => (
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
                <Text w="50%">{joint.userCreatorName}</Text>
                <Text w="50%">{joint.theList.length}</Text>
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default OthersJoints;
