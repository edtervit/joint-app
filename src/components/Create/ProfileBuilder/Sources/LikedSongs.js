import {
  Box,
  Center,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

function LikedSongs() {
  const [radioValue, setRadioValue] = useState("nah");

  //actions
  const setGotLikedSongs = useStoreActions(
    (actions) => actions.setGotLikedSongs
  );
  const setNoLikedSongsSelected = useStoreActions(
    (actions) => actions.setNoLikedSongsSelected
  );
  const addToList = useStoreActions((actions) => actions.addToList);
  const callAPI = useStoreActions((actions) => actions.callAPI);

  // estate
  const token = useStoreState((state) => state.token);

  //handlers
  const getTheDataHandler = async () => {
    if (radioValue === "nah") {
      setGotLikedSongs(true);
    } else {
      if (radioValue === "all") {
        const params = {
          url: `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`,
          token: token,
        };
        let spotifyResponse = await callAPI(params);
        console.log(spotifyResponse);
        let offset = 50;

        if (spotifyResponse) {
          spotifyResponse.items.forEach((song) => {
            const songName = song.track.name;
            const songArtist = song.track.artists[0].name;
            const songImage = song.track.album.images[0].url;
            const songUri = song.track.uri;
            const payload = {
              name: songName,
              artist: songArtist,
              image: songImage,
              uri: songUri,
            };
            //for each song use addtolist action to add it to overall list
            addToList(payload);
          });
        }
        while (spotifyResponse.next) {
          let newParams = {
            url: `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=50`,
            token: token,
          };
          spotifyResponse = await callAPI(newParams);
          if (spotifyResponse) {
            spotifyResponse.items.forEach((song) => {
              const songName = song.track.name;
              const songArtist = song.track.artists[0].name;
              const songImage = song.track.album.images[0].url;
              const songUri = song.track.uri;
              const payload = {
                name: songName,
                artist: songArtist,
                image: songImage,
                uri: songUri,
              };
              //for each song use addtolist action to add it to overall list
              addToList(payload);
            });
          }
          console.log(spotifyResponse);
          offset += 50;
        }
      }
      // once job is complete set this to true
      setGotLikedSongs(true);
    }
  };

  //when is getting data is true, run the code to get the data
  const isGettingData = useStoreState((state) => state.isGettingData);
  useEffect(() => {
    if (isGettingData) {
      getTheDataHandler();
    }
    // eslint-disable-next-line
  }, [isGettingData]);

  //Checks to see if nah is ticked
  useEffect(() => {
    if (radioValue !== "nah") {
      setNoLikedSongsSelected(false);
    } else {
      setNoLikedSongsSelected(true);
    }
    return () => {};
    // eslint-disable-next-line
  }, [radioValue]);

  return (
    <div>
      <Box my={3} display="flex" flexDirection="column">
        <Heading size="sml">Liked Songs</Heading>
        <p>Radio value: {radioValue}</p>
        <RadioGroup
          name="liked-songs"
          defaultValue="nah"
          onChange={(value) => setRadioValue(value)}
        >
          <Center>
            <Stack spacing={4} direction="row">
              <Radio value="nah">Nah</Radio>
              <Radio value="200">200 Most recent</Radio>
              <Radio value="500">500 Most recent</Radio>
              <Radio value="all">All liked songs</Radio>
            </Stack>
          </Center>
        </RadioGroup>
      </Box>
    </div>
  );
}

export default LikedSongs;
