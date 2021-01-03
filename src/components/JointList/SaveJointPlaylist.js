import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import { Redirect } from "react-router-dom";

function SaveJointPlaylist() {
  // local state
  const [failedCreating, setFailedCreating] = useState(false);
  const [passedCreating, setPassedcreating] = useState(false);
  const [joint, setJoint] = useState(null);
  const [alreadyExists, setAlreadyExists] = useState(false);

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);

  //handlers
  const saveJointPlaylistHandler = async () => {
    let setTrueIfExists = false;
    await axios
      .post(
        `${process.env.REACT_APP_BACK_URL}/jointplaylist/dupecheck`,
        jointList
      )
      .then((response) => {
        if (response.data.length > 0) {
          console.log("This joint list already exists");
          setJoint(response.data[0]);
          setAlreadyExists(true);
          setTrueIfExists = true;
        } else {
          console.log("is new!");
          setAlreadyExists(false);
        }
      })
      .catch((err) => {
        console.log("failed to check if already exists");
        console.log(err.message);
      });

    !setTrueIfExists &&
      (await axios
        .post(
          `${process.env.REACT_APP_BACK_URL}/jointplaylist/create`,
          jointList
        )
        .then((response) => {
          if (response) {
            setFailedCreating(false);
            setJoint(response.data._id);
            setPassedcreating(true);
            console.log("reponse was good, jointlist saved ");
          }
        })
        .catch((err) => {
          console.log("Error occured");
          console.log(err.message);
          setFailedCreating(true);
        }));
  };

  useEffect(() => {
    !passedCreating && !failedCreating && saveJointPlaylistHandler();
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {failedCreating && (
        <p> UH OH STINKY, FAILED SAVING JOINT TO DATABASE. TRY AGAIN? </p>
      )}
      {passedCreating && (
        <div className="pass">
          <Redirect to={`shareJ/${joint}`} />
        </div>
      )}
      {alreadyExists && (
        <div className="">
          <Redirect to={`shareJ/${joint._id}`} />
        </div>
      )}
    </div>
  );
}

export default SaveJointPlaylist;
