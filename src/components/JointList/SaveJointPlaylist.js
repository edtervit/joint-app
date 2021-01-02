import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import { Link } from "react-router-dom";

function SaveJointPlaylist() {
  // local state
  const [failedCreating, setFailedCreating] = useState(false);
  const [passedCreating, setPassedcreating] = useState(false);
  const [joint, setJoint] = useState(null);

  //easy peasy state
  let jointList = useStoreState((state) => state.jointList);

  //handlers
  const saveJointPlaylistHandler = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACK_URL}/jointplaylist/create`, jointList)
      .then((response) => {
        if (response) {
          console.log(response);
          setFailedCreating(false);
          setPassedcreating(true);
          setJoint(response.data._id);
          console.log("reponse was good");
        }
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err.message);
        setFailedCreating(true);
      });
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
          <p>
            Send this link to your friend to let them know you've compared
            profiles! <br></br>
            <Link to={`shareJ/${joint}`} target="_blank">
              {process.env.REACT_APP_FRONT_URL}/shareJ/{joint}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default SaveJointPlaylist;
