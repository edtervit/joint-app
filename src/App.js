import "./App.css";
import { useStoreState } from "easy-peasy";

import TopTracks from "./components/afterLogin/collectTracks/TopTracks";
import Playlists from "./components/afterLogin/collectTracks/Playlists";
import Login from "./components/beforeLogin/Login";
import Profile from "./components/afterLogin/Profile";
import logo from "./joint.png";

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
          <Playlists />
          <TopTracks />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
