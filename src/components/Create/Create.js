import React from "react";
import Login from "./beforeLogin/Login";
import Profile from "./afterLogin/Profile";
import Stepone from "./afterLogin/Stepone";
import Yourtracks from "./afterLogin/Yourtracks";
import SavedTrackLists from "./afterLogin/SavedTrackLists";
import logo from "../../joint.png";

import { useStoreState } from "easy-peasy";

function Create() {
  //state

  const isLogged = useStoreState((state) => state.isLoggedIn);
  console.log("Is logged in: " + isLogged);

  return (
    <div className="App">
      <img className="logo" src={logo} alt="" />
      {isLogged ? (
        <div className="isloggedIn">
          <Profile />
          <br />
          <Stepone />
          <SavedTrackLists />
          <Yourtracks />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Create;
