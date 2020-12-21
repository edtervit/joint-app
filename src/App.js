import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import FriendsSavedTracklist from "./components/share/FriendsSavedTracklist";
import Create from "./components/Create/Create";

function App() {
  return (
    <div>
      <Router>
        <Route path="/share/:trackListID" component={FriendsSavedTracklist} />
        <Route path="/" exact component={Create} />
      </Router>
    </div>
  );
}

export default App;
