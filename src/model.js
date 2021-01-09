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

  failedCookie: false,
  token: null,

  amountOfSavedTrackLists: 0,
  friendsTrackList: null,
  persistFriendsTrackList: persist(null),
  myTrackListToCompare: null,
  fromSharePage: false,
  fromShareJPage: false,
  shareJID: null,
  jointList: null,
  yourJoints: null,
  //Thunks
  getProfile: thunk(async (actions) => {
    let params = queryString.parse(window.location.search);
    let parsedToken = params.access_token;
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
      actions.logIn(parsedToken);
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
      return data;
    } else {
      const dataFailed = await res.json();
      return dataFailed;
    }
  }),

  callDB: thunk(async (actions, payload) => {
    const baseUrl = process.env.REACT_APP_BACK_URL;
    const url = `${baseUrl}${payload.url}`;

    const res = await fetch(url, { method: `${payload.method}` });
    if (!res.ok) {
      return null;
    }
    const data = res.json();
    return data;
  }),
  ////////////////
  //actions//////
  ////////////////
  setProfile: action((state, profile) => {
    state.profile = profile;
  }),
  logIn: action((state, token) => {
    state.isLoggedIn = true;
    state.token = token;
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
  }),

  ///Profile Builder///
  setIsGettingData: action((state, value) => {
    state.isGettingData = value;
  }),
  setGotAllData: action((state, value) => {
    state.gotAllData = value;
  }),

  setGotTopSongs: action((state, value) => {
    state.gotTopSongs = value;
  }),
  setNoTopSongsSelected: action((state, value) => {
    state.noTopSongsSelected = value;
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
