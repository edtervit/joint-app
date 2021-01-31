import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import lemonke from "../../Images/lemonke.jpg";
import { Redirect } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

function FriendsSavedTracklist({ match }) {
  //state
  const [isValid, setIsVaild] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  //easy state
  const friendsTrackList = useStoreState((state) => state.friendsTrackList);

  //actions
  const setFriendsTrackList = useStoreActions(
    (actions) => actions.setFriendsTrackList
  );
  const setPersistFriendsTrackList = useStoreActions(
    (actions) => actions.setPersistFriendsTrackList
  );

  //thunk
  const callDB = useStoreActions((actions) => actions.callDB);

  const params = match.params.trackListID;

  useEffect(() => {
    const getSavedTrackLists = async (id) => {
      let payload = {
        url: `/tracklists/getTrackList/${id}`,
        method: "GET",
      };
      const res = await callDB(payload);

      if (res && res.length > 0) {
        console.log(res[0]);
        setFriendsTrackList(res[0]);
        setIsVaild(true);
        setIsLoading(false);
      } else {
        console.log("Database error or savedtracklists is empty array");
        setIsVaild(false);
        setIsLoading(false);
      }
    };
    getSavedTrackLists(params);
    // eslint-disable-next-line
  }, [params]);

  const compareTracksHandler = async (list) => {
    console.log(list);
    await setPersistFriendsTrackList(list);
    setRedirect(true);
  };

  return (
    <div>
      {redirect && (
        <Redirect
          to={{
            pathname: "/",
            state: { fromShare: "fromShare", fromWho: friendsTrackList.name },
          }}
        />
      )}
      {!isValid && !isLoading && (
        <div className="failed">
          <h1>Uh oh stinky!</h1>
          <p>
            {params} doesn't return any matches, you sure you got the link
            right?
          </p>
          <img src={lemonke} alt="" />
        </div>
      )}
      {isValid && (
        <Box p={5}>
          <Heading my={5}>
            {friendsTrackList.name} wants to compare music with you!
          </Heading>
          <Text>
            We will compare both of your music and find matches for you!
          </Text>
          <Text>
            You can then save this list of matches into a playlist for you to
            enjoy together
          </Text>
          <Button my={3} onClick={() => compareTracksHandler(friendsTrackList)}>
            Compare with {friendsTrackList.name}
          </Button>
        </Box>
      )}
    </div>
  );
}

export default FriendsSavedTracklist;
