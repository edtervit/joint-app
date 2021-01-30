import {
  Box,
  Heading,
  Button,
  Text,
  Select,
  HStack,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

function Playlists() {
  // local state

  const [selectValue, setSelectValue] = useState(null);
  const [chosenPlaylists, setChosenPlaylists] = useState([]);

  const addToList = useStoreActions((actions) => actions.addToList);

  const playlistsFromSpotify = useStoreState(
    (state) => state.playlistsFromSpotify
  );
  const setPlaylistsFromSpotify = useStoreActions(
    (actions) => actions.setPlaylistsFromSpotify
  );

  const appendPlaylistsFromSpotify = useStoreActions(
    (actions) => actions.appendPlaylistsFromSpotify
  );

  const setGotPlaylists = useStoreActions((actions) => actions.setGotPlaylists);

  const setNoPlaylistsSelected = useStoreActions(
    (actions) => actions.setNoPlaylistsSelected
  );

  let token = useStoreState((state) => state.token);
  const callAPI = useStoreActions((actions) => actions.callAPI);

  //Handlers

  const addPlaylistToSelectedHandler = () => {
    //if the value of the playlist select is not the default value and not already in the chosen playlists list then add it to the array of chosen playlists
    if (selectValue && !chosenPlaylists.find((e) => e.id === selectValue)) {
      setChosenPlaylists([
        ...chosenPlaylists,
        playlistsFromSpotify.find((e) => e.id === selectValue),
      ]);
    }
  };

  const deletePlaylistHandler = (value) => {
    const newList = chosenPlaylists.filter((item) => item.id !== value);
    setChosenPlaylists(newList);
  };

  const getTheDataHandler = async () => {
    const getTheTing = async (playlists) => {
      for (const playlist of playlists) {
        const playlistID = playlist.id;
        const params = {
          url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
          token: token,
        };
        let spotifyResponse = await callAPI(params);
        console.log(spotifyResponse);

        if (spotifyResponse) {
          spotifyResponse.items.forEach((song) => {
            //if the song is not local only and has album art
            if (!song.is_local && song.track.album.images[0]) {
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
            }
          });
        }
        while (spotifyResponse.next) {
          let newParams = {
            url: spotifyResponse.next,
            token: token,
          };
          spotifyResponse = await callAPI(newParams);
          console.log(spotifyResponse);
          if (spotifyResponse) {
            spotifyResponse.items.forEach((song) => {
              //if the song is not local only and has album art
              if (!song.is_local && song.track.album.images[0]) {
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
              }
            });
          }
          console.log(spotifyResponse);
        }
      }
    };

    if (!chosenPlaylists || chosenPlaylists.length === 0) {
      setGotPlaylists(true);
    } else {
      await getTheTing(chosenPlaylists);
      setGotPlaylists(true);
    }
  };

  //use effects

  //when is getting data is true, run the code to get the data
  const isGettingData = useStoreState((state) => state.isGettingData);
  useEffect(() => {
    if (isGettingData) {
      getTheDataHandler();
    }
    // eslint-disable-next-line
  }, [isGettingData]);

  // gets the users playlists to populate the dropdown select
  useEffect(() => {
    const callAPIforPlaylists = async () => {
      let params = {
        url: `https://api.spotify.com/v1/me/playlists?limit=50&offset=0`,
        token: token,
      };
      let spotifyPlaylistResponse = await callAPI(params);

      if (spotifyPlaylistResponse.items) {
        setPlaylistsFromSpotify(spotifyPlaylistResponse.items);

        while (spotifyPlaylistResponse.next) {
          let params2 = {
            url: spotifyPlaylistResponse.next,
            token: token,
          };
          spotifyPlaylistResponse = await callAPI(params2);
          spotifyPlaylistResponse.items.map((playlist) =>
            appendPlaylistsFromSpotify(playlist)
          );
        }
      }
    };
    if (token) {
      callAPIforPlaylists();
    }

    // eslint-disable-next-line
  }, [token]);

  //tells profile if no playlists are selected
  useEffect(() => {
    if (chosenPlaylists.length === 0 || !chosenPlaylists) {
      setNoPlaylistsSelected(true);
    } else {
      setNoPlaylistsSelected(false);
    }
    // eslint-disable-next-line
  }, [chosenPlaylists]);

  return (
    <Box>
      <Heading size="sml">Playlists</Heading>
      {playlistsFromSpotify && (
        <HStack>
          <Select
            placeholder="Select playlist"
            onChange={(e) => setSelectValue(e.currentTarget.value)}
          >
            {playlistsFromSpotify &&
              playlistsFromSpotify.map((playlist, index) => (
                <option key={playlist.uri} value={playlist.id}>
                  {playlist.name} (Tracks: {playlist.tracks.total})
                </option>
              ))}
          </Select>
          <Button onClick={() => addPlaylistToSelectedHandler()}>
            Add Playlist
          </Button>
        </HStack>
      )}

      <Box my={5}>
        <Text>Selected playlists:</Text>
        {chosenPlaylists &&
          chosenPlaylists.map((playlist, index) => (
            <Center key={"playlist item" + index}>
              <HStack my={2}>
                <Text>
                  {playlist.name} (Tracks: {playlist.tracks.total})
                </Text>
                <Button
                  size="md"
                  bg="red.100"
                  onClick={() => deletePlaylistHandler(playlist.id)}
                >
                  Remove
                </Button>
              </HStack>
            </Center>
          ))}
        {chosenPlaylists.length === 0 && <Text>No playlists selected.</Text>}
      </Box>
    </Box>
  );
}

export default Playlists;
