
import { action, thunk } from "easy-peasy";
import queryString from "query-string";

const model = {
  
    profile: null,
    isLoggedIn: false, 

    //Thunks 
    getProfile: thunk( async actions => {
      let token = queryString.parse(window.location.search);
      let parsedToken = token.access_token;
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        }})
        const data = await res.json();
        console.log(data)
        actions.setProfile(data)
        actions.logIn();
      }),


    //actions
    setProfile: action((state, profile) => {
      state.profile = profile;
    }),
    logIn: action((state) => {
      state.isLoggedIn = true;
    })
  
} 

export default model;
