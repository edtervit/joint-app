import "./App.css";
import { useStoreState } from "easy-peasy";

import Login from "./components/beforeLogin/Login";
import Profile from "./components/afterLogin/Profile";
import Stepone from "./components/afterLogin/Stepone";
import Yourtracks from "./components/afterLogin/Yourtracks";
import logo from "./joint.png";
import Steptwo from "./components/afterLogin/Steptwo";
import SavedTrackLists from "./components/afterLogin/SavedTrackLists";

function App() {
  //state
  const isLogged = useStoreState((state) => state.isLoggedIn);
  console.log("Is logged in: " + isLogged);

  //handlers

  return (
    <div className="App">
      <img className="logo" src={logo} alt="" />
      {isLogged ? (
        <div className="isloggedIn">
          <Profile />
          <br />
          <Stepone />
          <Steptwo />
          <SavedTrackLists />
          <Yourtracks />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
