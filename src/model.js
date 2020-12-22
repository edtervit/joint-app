import { action, thunk, persist } from "easy-peasy";
import queryString from "query-string";

const model = {
  profile: null,
  isLoggedIn: false,
  usersSelectedTracks: null,
  failedCookie: false,
  token: null,
  hasSavedTrackLists: false,
  savedTrackLists: null,
  amountOfSavedTrackLists: 0,
  friendsTrackList: null,
  persistFriendsTrackList: persist(null),
  fromSharePage: false,

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
    }
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
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

  //actions
  setProfile: action((state, profile) => {
    state.profile = profile;
  }),
  logIn: action((state, token) => {
    state.isLoggedIn = true;
    state.token = token;
    state.failedCookie = false;
  }),
  logOut: action((state) => {
    state.isLoggedIn = false;
    document.location.href = "../";
  }),
  failCookie: action((state) => {
    state.isLoggedIn = false;
    state.failedCookie = true;
  }),
  clearList: action((state) => {
    state.usersSelectedTracks = null;
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

  setFromSharePage: action((state, value) => {
    state.fromSharePage = value;
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
