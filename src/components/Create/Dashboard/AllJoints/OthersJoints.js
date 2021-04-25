import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";

import { Spinner } from "@chakra-ui/spinner";

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
    <div className="my-4">
      <h2 className="title text-2xl">Joints others made with your link:</h2>
      <div>
        {isLoading && !friendsJoints && (
          <Spinner size="xl" color="white"></Spinner>
        )}

        {!friendsJoints && !isLoading && (
          <p>
            Nothing here 🙄, send your share link to friends and check back!{" "}
          </p>
        )}
        {friendsJoints && (
          <div className="flex flex-col">
            {friendsJoints.map((joint, index) => (
              <div className="flex text-left my-2 w-full justify-between">
                <ReactLink to={`/sharej/${joint._id}`} key={joint._id}>
                  <p>{joint.userCreatorName}</p>
                  <p className="font-bold">{joint.theList.length} Matches</p>
                </ReactLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OthersJoints;
