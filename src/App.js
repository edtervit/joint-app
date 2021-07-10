import { BrowserRouter as Router, Route } from "react-router-dom";

import FriendsSavedTracklist from "./components/share/FriendsSavedTracklist";
import Brain from "./components/Create/Brain";
import Compare from "./components/Compare/Compare";
import ShareJoint from "./components/share/ShareJoint";
import MusicProfile from "./components/Create/Dashboard/MusicProfile/MusicProfile";
import Nav from "./components/Create/Nav";
import Footer from "./components/Create/Footer";
import AlwaysWrapped from "./components/Create/Dashboard/AlwaysWrapped";

import { useStoreState } from "easy-peasy";

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
        <Route path="/alwayswrapped" component={AlwaysWrapped} />
        <Route path="/guest" component={Brain} />
        <Route path="/" exact component={Brain} />
        {isLogged && <Footer />}
      </Router>
    </div>
  );
}

export default App;
