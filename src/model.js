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
};

export default model;
