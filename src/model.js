import { action, thunk } from "easy-peasy";
import queryString from "query-string";

const model = {
  profile: null,
  isLoggedIn: false,
  usersSelectedTracks: null,
  failedCookie: false,
  token: null,

  //Thunks
  getProfile: thunk(async (actions) => {
    let token = queryString.parse(window.location.search);
    let parsedToken = token.access_token;
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

  callAPI: thunk(async (actions, payload, { getStoreState }) => {
    const storeState = getStoreState();
    const token = storeState.token;
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
