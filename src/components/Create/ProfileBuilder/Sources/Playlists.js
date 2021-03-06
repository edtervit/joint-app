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

  const addPlaylistToSelectedHandler = (selectValue) => {
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
  }, []);

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
    <div className="w-full ">
      <h1 className="font-bold mt-4 mb-2">Playlists</h1>

      {playlistsFromSpotify && (
        <div>
          <select
            className="select w-full"
            value={selectValue}
            onChange={(e) => {
              setSelectValue(e.currentTarget.value);
              addPlaylistToSelectedHandler(e.currentTarget.value);
            }}
          >
            <option value="">Select your playlists</option>
            {playlistsFromSpotify &&
              playlistsFromSpotify.map((playlist, index) => (
                <option key={playlist.uri} value={playlist.id}>
                  {playlist.name.length > 30
                    ? playlist.name.slice(0, 30).concat("...")
                    : playlist.name}{" "}
                  (Tracks: {playlist.tracks.total})
                </option>
              ))}
          </select>
        </div>
      )}
      {playlistsFromSpotify && (
        <div className="my-2">
          <button
            className="btn2 "
            onClick={() => setChosenPlaylists(playlistsFromSpotify)}
          >
            Add all
          </button>
          <button className="btn2 " onClick={() => setChosenPlaylists([])}>
            Remove All
          </button>
        </div>
      )}
      <div className="my-4 ">
        {chosenPlaylists.length > 1 ? (
          <p>{chosenPlaylists.length} playlists selected:</p>
        ) : (
          <p>Selected Playlist</p>
        )}
        <div className="max-h-36 overflow-y-auto scrollbar bg-opacity-30 bg-black rounded-md p-4">
          {chosenPlaylists &&
            chosenPlaylists.map((playlist, index) => (
              <div
                key={"playlist item" + index}
                className="flex justify-between my-1"
              >
                <p>
                  {playlist.name.length > 20
                    ? playlist.name.slice(0, 20).concat("...")
                    : playlist.name}{" "}
                  (Tracks: {playlist.tracks.total})
                </p>
                <button
                  className="btn2"
                  onClick={() => deletePlaylistHandler(playlist.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          {chosenPlaylists.length === 0 && <p>No playlists selected.</p>}
        </div>
      </div>
    </div>
  );
}

export default Playlists;
