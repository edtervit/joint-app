import { BrowserRouter as Router, Route } from "react-router-dom";

import FriendsSavedTracklist from "./components/share/FriendsSavedTracklist";
import Brain from "./components/Create/Brain";
import Compare from "./components/Compare/Compare";
import ShareJoint from "./components/share/ShareJoint";
import MusicProfile from "./components/Create/Dashboard/MusicProfile/MusicProfile";
import Nav from "./components/Create/Nav";
import { useStoreState } from "easy-peasy";
import PlaylistMaker from "./components/Create/Dashboard/PlaylistMaker";

function App() {
  const isLogged = useStoreState((state) => state.isLoggedIn);

  return (
    <div>
      <Router>
        {isLogged && <Nav />}
        <Route path="/shareJ/:trackListID" component={ShareJoint} />
        <Route path="/s/:trackListID" component={FriendsSavedTracklist} />
        <Route path="/compare" component={Compare} />
        <Route path="/myprofile" component={MusicProfile} />
        <Route path="/playlistmaker" component={PlaylistMaker} />
        <Route path="/guest" component={Brain} />
        <Route path="/" exact component={Brain} />
      </Router>
    </div>
  );
}

export default App;
