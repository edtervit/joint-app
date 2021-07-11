import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import lemonke from "../../Images/lemonke.jpg";
import { Redirect } from "react-router-dom";
import { Box, Heading, Center, Image } from "@chakra-ui/react";
import Loading from "../reusable/Loading";
import explainer from "../../video/explainervidV1.2.mp4";
import logo from "../../joint.png";
import { FaChevronDown } from "react-icons/fa";

function FriendsSavedTracklist({ match }) {
  //page title

  useEffect(() => {
    document.title = "Joint Playlist - Friend's Link";
  }, []);

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
    <div className="bg-gray min-h-screen">
      <div className="bg-gradient-to-r from-red to-purple rounded-b-4xl min-h-75% flex flex-col">
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
                  <p>
                    {params} doesn't return any profile or tracklist matches,
                    you sure you got the link right?
                  </p>
                  <Center>
                    <Image my={3} src={lemonke} alt="uh oh stinky le monke" />
                  </Center>
                </>
              )}
              {errorMessage && errorMessage === "who" && (
                <>
                  <Heading my={3}>Uh oh stinkyyyyyyyy</Heading>
                  <p>
                    We found {errorName} in the database but they've deleted
                    their music profile.
                  </p>
                  <p>Tell them to pull their finger out and rebuild it.</p>
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
            <div className="cont items-center md:pt-32 md:pb-28">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight ">
                Compare music with friends and find songs in common.
              </h1>
              <h2 className="my-4 title text-2xl md:mt-16">
                {friendsCustomName} wants to compare music with you!
              </h2>
              <button
                className="btn md:text-3xl my-4  md:mb-4 "
                onClick={() => compareTracksHandler(friendsTrackList)}
              >
                Compare with {friendsCustomName}
              </button>
              <p className=" md:w-96 mx-auto font-thin">
                (we won’t show songs you don’t match on, your high school
                musical obsession is safe with us)
              </p>
            </div>
          </>
        )}
      </div>
      {isValid && !isLoading && !isLoadingName && (
        <div className="bg-gray">
          <div className="cont max-w-screen-xl">
            <p className="font-bold text-3xl my-4">This is how it works</p>
            <FaChevronDown className="text-white text-4xl animate-bounce mx-auto" />
            <div className="my-10 flex flex-wrap">
              <div className="md:w-1/2 mb-4 md:pr-12">
                <video className="shadow-xl" src={explainer} controls />
              </div>
              <ul className="md:w-1/2 text-2xl my-auto space-y-3 text-left pl-12 text-white list-disc list-outside">
                <li> Login and connect your spotify</li>
                <li>
                  Build your profile using your playlists, liked songs etc
                </li>
                <li>Send your profile link to friends to compare</li>
                <li>Get a list of the songs you both like</li>
                <li>Save it as a playlist to your Spotify</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendsSavedTracklist;
