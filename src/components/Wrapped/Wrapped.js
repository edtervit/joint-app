import { useStoreState, useStoreActions } from "easy-peasy";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Wrapped(props) {
  const profile = useStoreState((state) => state.profile);
  const token = useStoreState((state) => state.token);

  const callAPI = useStoreActions((actions) => actions.callAPI);

  const length = props.length;

  //state
  const [link, setLink] = useState("");
  const [whenError, setWhenError] = useState(false);
  const [topArtists, setTopArtists] = useState(false);
  const [topTracks, setTopTracks] = useState(false);

  // get user name
  useEffect(() => {
    if (profile && profile.customName) {
      setLink(profile.customName);
    } else if (profile && profile.id) {
      setLink(profile.id);
    }
  }, [profile]);

  useEffect(() => {
    ///get top artists
    const getTopArtistsHandler = async () => {
      const url = `https://api.spotify.com/v1/me/top/artists?time_range=${length}_term&limit=50`;
      const payload = {
        token: token,
        url: url,
      };

      if (token) {
        const data = await callAPI(payload);
        setTopArtists(data.items);
        setWhenError(false);
      } else {
        console.log("Error");
        setWhenError(true);
      }
    };
    const getTopTracksHandler = async () => {
      const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${length}_term&limit=50`;
      const payload = {
        token: token,
        url: url,
      };

      if (token) {
        const data = await callAPI(payload);

        setTopTracks(data.items);
        setWhenError(false);
      } else {
        console.log("Error");
        setWhenError(true);
      }
    };
    getTopArtistsHandler();
    getTopTracksHandler();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex justify-center">
      <div className="black-box w-full md:w-550">
        {!profile && <Redirect to="/" />}
        {length === "short" && (
          <p className="text-2xl mb-4 font-bold ">Your past 4 weeks wrapped!</p>
        )}
        {length === "medium" && (
          <p className="text-2xl mb-4 font-bold ">
            Your past 6 months wrapped!
          </p>
        )}
        {length === "long" && (
          <p className="text-2xl mb-4 font-bold ">All time wrapped!</p>
        )}
        {topArtists && topArtists[0] && topArtists[0].images && (
          <img
            className="w-3/4 mx-auto md:w-52 pb-4"
            src={topArtists[0].images[0].url}
            alt={`${topArtists[0].name}`}
          />
        )}
        <p>Compare music with me at:</p>
        <a className="font-bold text-white " target="_blank" href="/">
          JointPlaylist.com/s/{link}
        </a>
        {whenError && <p> Error</p>}

        <div className="flex justify-center space-x-4 md:space-x-20 mt-4 md:text-base text-xs">
          <div className="w-1/2 md:w-auto">
            <p className="text-sm md:text-lg">Top Artists</p>
            {topArtists &&
              topArtists.slice(0, 5).map((artist, index) => (
                <div key={index}>
                  <p className="text-left">
                    {index + 1}. {artist.name}
                  </p>
                </div>
              ))}
          </div>
          <div className="w-1/2 md:w-auto">
            <p className="text-sm md:text-lg">Top Tracks</p>
            {topTracks &&
              topTracks.slice(0, 5).map((track, index) => (
                <div key={index}>
                  <p className="text-left">
                    {" "}
                    {index + 1}. {track.name.slice(0, 25)}
                    {track.name.length > 25 ? "..." : ""}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wrapped;
