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
  addToList: action((state, payload) => {
    let List = state.usersSelectedTracks;
    let songs = payload;
    console.log(songs);
    console.log(List);
    songs.map((item) => {
      //check if list is empty
      if (!List) {
        const empty = { item };
        state.usersSelectedTracks = empty;
        console.log(
          `This is the first song and I added the song ${item.name} by ${item.artist}`
        );
      } else {
        //check if item is in the list
        if (!Object.values(List).includes(item.uri)) {
          console.log("song already exists in list");
        } else {
          console.log(`I added the song ${item.name} by ${item.artist}`);
        }
      }
    });
  }),
};

export default model;
