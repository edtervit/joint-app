import React, { useEffect, useState } from "react";
import { Link, useToast } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link as ReactLink } from "react-router-dom";
import Loading from "../../../reusable/Loading";

function YourJoints() {
  //  //toast
  const toast = useToast();

  const yourJoints = useStoreState((state) => state.yourJoints);
  const profile = useStoreState((state) => state.profile);
  const isGuest = useStoreState((state) => state.isGuest);

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
    if (check && !isGuest) {
      const res = await callDB(payload);
      setForceReload(true);
      setIsLoading(true);
      console.log(res);
      setForceReload(false);
    }
    if (isGuest) {
      toast({
        title: "Error!",
        description: "Sorry this feature is disabled as a guest.",
        status: "error",
        isClosable: "true",
      });
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
        console.log(res);
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
    <div>
      <h2 className="title text-2xl">Your Joints:</h2>
      {isLoading && <Loading />}
      <div>
        {!yourJoints && !isLoading && (
          <p>
            You haven't made any joints, get your friends to send your their
            share link!
          </p>
        )}
        {yourJoints && !isLoading && (
          <div className="flex flex-col">
            {yourJoints.map((joint, index) => (
              <div
                key={joint._id}
                className="flex text-left my-2 w-full justify-between"
              >
                <Link as={ReactLink} to={`/sharej/${joint._id}`}>
                  <p>{joint.userFriendName}</p>
                  <p className="font-bold">{joint.theList.length} Matches</p>
                </Link>
                <button
                  className="btn2 mr-4"
                  onClick={() => deleteJointHandler(joint._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default YourJoints;
