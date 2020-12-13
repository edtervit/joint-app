import "./App.css";
import { useState } from "react";
import TopTracks from "./components/afterLogin/collectTracks/TopTracks";
import Playlists from "./components/afterLogin/collectTracks/Playlists";
import Login from "./components/beforeLogin/Login";
import Profile from "./components/afterLogin/Profile";
import logo from "./joint.png";

function App() {
  //state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [topStuff, setTopStuff] = useState(null);
  const [theList, setTheList] = useState([]);

  //handlers

  return (
    <div className="App">
      <img className="logo" src={logo} alt="" />

      {isLoggedIn ? (
        <div className="isloggedIn">
          <Profile profile={profile} />
          <br />
          <Playlists
            theList={theList}
            setIsLoggedIn={setIsLoggedIn}
            setTheList={setTheList}
          />
          <TopTracks
            topStuff={topStuff}
            setIsLoggedIn={setIsLoggedIn}
            setTopStuff={setTopStuff}
          />
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setProfile={setProfile} />
      )}
    </div>
  );
}

export default App;
