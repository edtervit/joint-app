import { Box, Heading, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

function Playlists() {
  // local state

  const playlistsFromSpotify = useStoreState(
    (state) => state.playlistsFromSpotify
  );
  const setPlaylistsFromSpotify = useStoreActions(
    (actions) => actions.setPlaylistsFromSpotify
  );

  const appendPlaylistsFromSpotify = useStoreActions(
    (actions) => actions.appendPlaylistsFromSpotify
  );

  let token = useStoreState((state) => state.token);
  const callAPI = useStoreActions((actions) => actions.callAPI);

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

  useEffect(() => {}, [playlistsFromSpotify]);

  return (
    <Box>
      <Heading size="sml">Playlists</Heading>
      <Button onClick={() => console.log(playlistsFromSpotify)}>log</Button>
      {playlistsFromSpotify &&
        playlistsFromSpotify.map((playlist, index) => (
          <Box key={playlist.uri}>
            <Text>
              {index + 1}. {playlist.name}
            </Text>
          </Box>
        ))}
    </Box>
  );
}

export default Playlists;
