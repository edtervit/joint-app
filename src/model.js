import { action, thunk, persist } from "easy-peasy";
import queryString from "query-string";

const model = {
  profile: null,
  isLoggedIn: false,
  hasSavedTrackLists: false,
  savedTrackLists: null,

  //////Profile Builder/////
  usersSelectedTracks: null,
  isGettingData: false,
  gotAllData: false,

  ///Step 1///
  hasSelectedAnOption: false,
  //Top Songs//
  gotTopSongs: false,
  noTopSongsSelected: true,

  //Liked songs//
  gotLikedSongs: false,
  noLikedSongsSelected: true,

  //Playlists
  playlistsFromSpotify: null,
  gotPlaylists: false,
  noPlaylistsSelected: true,

  failedCookie: false,
  token: null,
  refreshToken: null,

  amountOfSavedTrackLists: 0,
  friendsTrackList: null,
  persistFriendsTrackList: persist(null),
  myTrackListToCompare: null,
  fromSharePage: false,
  fromShareJPage: false,
  shareJID: null,
  jointList: null,
  yourJoints: null,
  friendsJoints: null,

  isWaiting: false,

  //Thunks
  getProfile: thunk(async (actions) => {
    let params = queryString.parse(window.location.search);
    const parsedToken = params.access_token;
    const refreshToken = params.refresh;
    let urlState = params.state;
    if (urlState === "fromShare") {
      actions.setFromSharePage(true);
    } else if (urlState === "normal") {
      actions.setPersistFriendsTrackList({});
      actions.setFromSharePage(false);
    } else if (urlState === "fromShareJ") {
      actions.setFromShareJPage(true);
      actions.setPersistFriendsTrackList({});
      actions.setShareJID(params.shareJID);
    }
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      actions.setProfile(data);
      const tokens = {
        normal: parsedToken,
        refresh: refreshToken,
      };
      actions.logIn(tokens);
    } else {
      actions.failCookie();
    }
  }),

  callAPI: thunk(async (actions, payload) => {
    const token = payload.token;
    const url = payload.url;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.log(res);
      actions.failCookie();
    }
  }),

  postAPI: thunk(async (actions, payload) => {
    const token = payload.token;
    const url = payload.url;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload.body),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("passed posting");
      return data;
    } else {
      const dataFailed = await res.json();
      console.log("failed posting");
      return dataFailed;
    }
  }),

  refreshTokenAPI: thunk(async (actions, payload, { getState }) => {
    const baseUrl = process.env.REACT_APP_BACK_URL;
    const url = `${baseUrl}/token/refresh`;
    actions.setIsWaiting(true);
    const state = getState();
    const tokens = {
      token: state.token,
      refreshToken: state.refreshToken,
    };
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(tokens),
    });
    if (!res.ok) {
      const data = res.json();
      actions.setIsWaiting(false);
      return data;
    } else {
      const data = res.json();
      actions.setToken(res.access_token);
      actions.setIsWaiting(false);
      return data;
    }
  }),

  callDB: thunk(async (actions, payload) => {
    const baseUrl = process.env.REACT_APP_BACK_URL;
    const url = `${baseUrl}${payload.url}`;
    actions.setIsWaiting(true);
    const res = await fetch(url, { method: `${payload.method}` });
    if (!res.ok) {
      actions.setIsWaiting(false);
      return null;
    }

    const data = res.json();
    actions.setIsWaiting(false);
    return data;
  }),
  ////////////////
  //actions//////
  ////////////////
  setProfile: action((state, profile) => {
    state.profile = profile;
  }),
  logIn: action((state, tokens) => {
    state.isLoggedIn = true;
    state.token = tokens.normal;
    state.refreshToken = tokens.refresh;
    state.failedCookie = false;
  }),

  logOut: action((state) => {
    document.location.href = "../";
  }),
  failCookie: action((state) => {
    state.isLoggedIn = false;
    state.failedCookie = true;
  }),

  clearList: action((state) => {
    state.usersSelectedTracks = null;
    state.gotAllData = false;
    state.gotTopSongs = false;
    state.gotLikedSongs = false;
    state.gotPlaylists = false;
  }),

  ///Profile Builder///
  setIsGettingData: action((state, value) => {
    state.isGettingData = value;
  }),
  setGotAllData: action((state, value) => {
    state.gotAllData = value;
  }),

  //top songs
  setGotTopSongs: action((state, value) => {
    state.gotTopSongs = value;
  }),
  setNoTopSongsSelected: action((state, value) => {
    state.noTopSongsSelected = value;
  }),

  //liked songs
  setGotLikedSongs: action((state, value) => {
    state.gotLikedSongs = value;
  }),
  setNoLikedSongsSelected: action((state, value) => {
    state.noLikedSongsSelected = value;
  }),

  //playlist builder
  setPlaylistsFromSpotify: action((state, value) => {
    state.playlistsFromSpotify = value;
  }),

  setGotPlaylists: action((state, value) => {
    state.gotPlaylists = value;
  }),
  setNoPlaylistsSelected: action((state, value) => {
    state.noPlaylistsSelected = value;
  }),

  appendPlaylistsFromSpotify: action((state, value) => {
    state.playlistsFromSpotify = [...state.playlistsFromSpotify, value];
  }),

  setHasSavedTrackLists: action((state, value) => {
    state.hasSavedTrackLists = value;
  }),
  setSavedTrackLists: action((state, value) => {
    state.savedTrackLists = value;
  }),
  setAmountOfSavedTrackLists: action((state, value) => {
    state.amountOfSavedTrackLists = state.savedTrackLists.length;
  }),
  setFriendsTrackList: action((state, value) => {
    state.friendsTrackList = value;
  }),

  setPersistFriendsTrackList: action((state, value) => {
    state.persistFriendsTrackList = value;
  }),
  setMyTrackListToCompare: action((state, value) => {
    state.myTrackListToCompare = value;
  }),

  setFromSharePage: action((state, value) => {
    state.fromSharePage = value;
  }),
  setFromShareJPage: action((state, value) => {
    state.fromShareJPage = value;
  }),

  setJointList: action((state, value) => {
    state.jointList = value;
  }),
  setShareJID: action((state, value) => {
    state.shareJID = value;
  }),

  setYourJoints: action((state, value) => {
    state.yourJoints = value;
  }),

  setFriendsJoints: action((state, value) => {
    state.friendsJoints = value;
  }),

  setIsWaiting: action((state, value) => {
    state.isWaiting = value;
  }),

  setToken: action((state, value) => {
    state.token = value;
  }),

  setRefreshToken: action((state, value) => {
    state.refreshToken = value;
  }),

  addToList: action((state, payload) => {
    let List = state.usersSelectedTracks;
    //check if list is empty
    if (!List) {
      //if first song to be added to list , create the array
      const empty = [payload];
      state.usersSelectedTracks = empty;
    } else {
      // check if payload is in the list
      if (List.some((el) => el.uri === payload.uri)) {
      } else {
        state.usersSelectedTracks.push(payload);
      }
    }
  }),
};

export default model;
