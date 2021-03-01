import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import lemonke from "../../Images/lemonke.jpg";
import { Redirect } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  Center,
  Image,
  Stack,
  Container,
} from "@chakra-ui/react";
import Loading from "../reusable/Loading";
import explainer from "../../video/explainervidV1.2.mp4";
import logo from "../../joint.png";

function FriendsSavedTracklist({ match }) {
  //state
  const [isValid, setIsVaild] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorName, setErrorName] = useState("");

  //state custom names
  const [friendsCustomName, setFriendsCustomName] = useState("");
  const checkCustomNameDB = useStoreActions(
    (actions) => actions.checkCustomNameDB
  );
  const [isLoadingName, setIsLoadingName] = useState(true);

  //easy state
  const friendsTrackList = useStoreState((state) => state.friendsTrackList);

  //checks for custom names
  useEffect(() => {
    const call = async () => {
      const res = await checkCustomNameDB(friendsTrackList.id);
      if (res && res[0] && res[0].userCustomName) {
        setFriendsCustomName(res[0].userCustomName);
        setIsLoadingName(false);
      } else {
        setFriendsCustomName(friendsTrackList.name);
        setIsLoadingName(false);
      }
    };

    if (friendsTrackList && friendsTrackList.id) {
      setIsLoadingName(true);
      call();
    } else {
      setIsLoadingName(false);
    }

    // eslint-disable-next-line
  }, [friendsTrackList]);

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
        console.log(res);
        console.log(res.statusText);
        if (res.statusText === "Can't find tracklist") {
          const resProfileName = await res.json();
          console.log(resProfileName);
          setErrorName(resProfileName);
          setErrorMessage("who");
        } else if (res.statusText === "Can't find anything") {
          setErrorMessage("missing");
        }
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
      <Center>
        <Image src={logo} w="100px" my={5} />
      </Center>
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
            {errorMessage && errorMessage === "missing" && (
              <>
                <Heading my={3}>Who? Never heard of them.</Heading>
                <Text>
                  {params} doesn't return any profile or tracklist matches, you
                  sure you got the link right?
                </Text>
                <Center>
                  <Image my={3} src={lemonke} alt="uh oh stinky le monke" />
                </Center>
              </>
            )}
            {errorMessage && errorMessage === "who" && (
              <>
                <Heading my={3}>Uh oh stinkyyyyyyyy</Heading>
                <Text>
                  We found {errorName} in the database but they've deleted their
                  music profile.
                </Text>
                <Text>Tell them to pull their finger out and rebuild it.</Text>
                <Center>
                  <Image my={3} src={lemonke} alt="uh oh stinky le monke" />
                </Center>
              </>
            )}
          </Box>
        </Center>
      )}
      {isLoading || isLoadingName ? <Loading /> : ""}

      {isValid && !isLoading && !isLoadingName && (
        <>
          <Box p={5} pt={0}>
            <Heading my={5}>
              {friendsCustomName} wants to compare music with you!
            </Heading>
            <Text>
              We will compare both of your music and find matches for you!
            </Text>
            <Text>
              You can then save this list of matches into a playlist for you to
              enjoy together
            </Text>
            <Button
              my={3}
              onClick={() => compareTracksHandler(friendsTrackList)}
            >
              Compare with {friendsCustomName}
            </Button>
          </Box>
          <Center>
            <Container
              maxWidth="1400px"
              boxShadow="lg"
              bg="gray.50"
              borderRadius="md"
              m={5}
            >
              <Stack direction={["column", "column", "column", "row"]}>
                <Box
                  textAlign="left"
                  w={["100%", "100%", "100%", "50%"]}
                  p={3}
                  justifyContent="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Heading textAlign="left" my={2} pr="20%">
                    Compare music with friends and find songs in common.
                  </Heading>
                  <Text>1. Login and connect your spotify</Text>
                  <Text>
                    2. Build your profile using your playlists, liked songs etc
                  </Text>
                  <Text>3. Send your profile link to friends to compare</Text>
                  <Text>4. Get a list of the songs you both like</Text>
                  <Text>5. Save it as a playlist to your Spotify</Text>
                  <Button
                    my={3}
                    onClick={() => compareTracksHandler(friendsTrackList)}
                  >
                    Compare with {friendsCustomName}
                  </Button>
                  <Text fontSize="xs">
                    (we won’t show songs you don’t match on, your high school
                    musical obsession is safe with us)
                  </Text>
                </Box>

                <Box w={["100%", "100%", "100%", "50%"]} p={3}>
                  <Heading size="lg" my={3}>
                    How it works
                  </Heading>
                  <video src={explainer} controls />
                </Box>
              </Stack>
            </Container>
          </Center>
        </>
      )}
    </div>
  );
}

export default FriendsSavedTracklist;
