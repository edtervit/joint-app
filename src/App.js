import "./App.css";
import { useState } from "react";
import { useStoreState } from "easy-peasy";



import TopTracks from "./components/afterLogin/collectTracks/TopTracks";
import Playlists from "./components/afterLogin/collectTracks/Playlists";
import Login from "./components/beforeLogin/Login";
import Profile from "./components/afterLogin/Profile";
import logo from "./joint.png";



function App() {
  //state
  const isLogged = useStoreState(state => state.isLoggedIn);
  console.log(isLogged)
  const [topStuff, setTopStuff] = useState(null);
  const [theList, setTheList] = useState([]);

  //handlers

  return (
    
      <div className="App">
        <img className="logo" src={logo} alt="" />
        {isLogged ? (
          <div className="isloggedIn">
            <Profile  />
            <br />
            <Playlists
              theList={theList}

              setTheList={setTheList}
            />
            <TopTracks
              topStuff={topStuff}
              
              setTopStuff={setTopStuff}
            />
          </div>
        ) : (
          <Login   />
        )}
      </div>

  );
}

export default App;
