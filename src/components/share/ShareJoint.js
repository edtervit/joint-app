import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import lemonke from "../../Images/lemonke.jpg";
import { Redirect } from "react-router-dom";
import MakePlaylist from "../JointList/MakePlaylist";
import { Link, Box, Center } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import ListOfTracks from "../reusable/ListOfTracks";
import Loading from "../reusable/Loading";

function ShareJoint({ match }) {
  //state
  const [isValid, setIsVaild] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // easy peasy sstate
  const jointList = useStoreState((state) => state.jointList);
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const waitingTrackListCheck = useStoreState(
    (state) => state.waitingTrackListCheck
  );
  const hasSavedTrackLists = useStoreState((state) => state.hasSavedTrackLists);

  // EP actions
  const setJointList = useStoreActions((actions) => actions.setJointList);
  const setFromSharePage = useStoreActions(
    (actions) => actions.setFromSharePage
  );

  //custom names

  const [friendsCustomName, setFriendsCustomName] = useState("");
  const [usersCustomName, setUsersCustomName] = useState("");
  const checkCustomNameDB = useStoreActions(
    (actions) => actions.checkCustomNameDB
  );
  const [isLoadingName, setIsLoadingName] = useState(false);

  //checks for custom names
  useEffect(() => {
    const call = async () => {
      //do for friend
      const res = await checkCustomNameDB(jointList.userFriendID);
      if (res && res[0] && res[0].userCustomName) {
        setFriendsCustomName(res[0].userCustomName);
      } else {
        setFriendsCustomName(jointList.userFriendName);
      }

      //do for user
      const res2 = await checkCustomNameDB(jointList.userCreatorID);
      if (res2 && res2[0] && res2[0].userCustomName) {
        setUsersCustomName(res2[0].userCustomName);
        setIsLoadingName(false);
      } else {
        setUsersCustomName(jointList.userCreatorName);
        setIsLoadingName(false);
      }
      setIsLoadingName(false);
    };

    if (jointList && jointList.userFriendID && jointList.userCreatorID) {
      setIsLoadingName(true);
      call();
    }

    // eslint-disable-next-line
  }, [jointList]);

  const params = match.params.trackListID;

  //thunk
  const callDB = useStoreActions((actions) => actions.callDB);

  useEffect(() => {
    const getSavedTrackLists = async (id) => {
      let payload = {
        url: `/jointPlaylist/getJointPlaylist/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);

      if (res && res.length > 0) {
        setJointList(res[0]);
        setFromSharePage(false);
        setIsVaild(true);
        setIsLoading(false);
      } else {
        console.log("Database error or joint list is empty");
        setIsVaild(false);
        setIsLoading(false);
        setFromSharePage(false);
      }
    };
    if (match) {
      getSavedTrackLists(params);
    }

    // eslint-disable-next-line
  }, [params]);

  return (
    <div>
      {!isLoggedIn && jointList && !isLoadingName && !isLoading && (
        <Redirect
          to={{
            pathname: "/",
            state: { fromShareJ: "fromShareJ", fromWho: jointList._id },
          }}
        />
      )}

      {isLoading || isLoadingName ? <Loading /> : ""}

      {!hasSavedTrackLists &&
        !waitingTrackListCheck &&
        !isLoading &&
        !isLoadingName && (
          <Center>
            <Box
              bg="tomato"
              color="white"
              p={4}
              w="max-content"
              borderRadius="md"
            >
              <h2>Want to make a joint playlist like this with your friend?</h2>
              <Link mr={4} as={ReactLink} to="/">
                Click here to make a music profile you can compare with friends
              </Link>
            </Box>
          </Center>
        )}
      {!isValid && !isLoading && (
        <div className="failed">
          <h1>Uh oh stinky!</h1>
          <p>
            That doesn't return any matches, you sure you got the link right?
          </p>
          <Center>
            <img src={lemonke} alt="" />
          </Center>
        </div>
      )}
      {isValid && !isLoadingName && (
        <Box>
          <h1>
            This is the joint list of {usersCustomName} and {friendsCustomName}!
          </h1>
          <p>
            You have <strong>{jointList.theList.length} song matches </strong>{" "}
            and <strong> notReadyYet artist matches. </strong>
          </p>
          <p>
            Share this joint with someone!
            <br />
            <Link as={ReactLink} to={`${jointList._id}`} target="_blank">
              {process.env.REACT_APP_FRONT_URL}/shareJ/{jointList._id}
            </Link>
          </p>

          <MakePlaylist />
          {jointList.theList && <ListOfTracks TrackList={jointList.theList} />}
        </Box>
      )}
    </div>
  );
}

export default ShareJoint;
