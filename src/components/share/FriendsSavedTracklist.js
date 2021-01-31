import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import lemonke from "../../Images/lemonke.jpg";
import { Redirect } from "react-router-dom";
import { Box, Button, Heading, Text, Center, Image } from "@chakra-ui/react";

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
        <Center>
          <Box className="failed" textAlign="center">
            <Heading my={3}>Uh oh stinky!</Heading>
            <Text>
              {params} doesn't return any matches, you sure you got the link
              right?
            </Text>
            <Text>
              Or maybe your friend has made a new profile since sending you the
              link, ask them for their current share link!
            </Text>
            <Center>
              <Image my={3} src={lemonke} alt="uh oh stinky le monke" />
            </Center>
          </Box>
        </Center>
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
