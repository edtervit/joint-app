import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import FriendsSavedTracklist from "./components/share/FriendsSavedTracklist";
import Brain from "./components/Create/Brain";
import Compare from "./components/Compare/Compare";
import ShareJoint from "./components/share/ShareJoint";

function App() {
  return (
    <div>
      <Router>
        <Route path="/shareJ/:trackListID" component={ShareJoint} />
        <Route path="/share/:trackListID" component={FriendsSavedTracklist} />
        <Route path="/compare" component={Compare} />
        <Route path="/" exact component={Brain} />
      </Router>
    </div>
  );
}

export default App;
