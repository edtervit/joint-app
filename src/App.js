import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ASavedTracklist from "./components/share/ASavedTracklist";
import Create from "./components/Create/Create";

function App() {
  return (
    <div>
      <Router>
        <Route path="/share/:trackListID" component={ASavedTracklist} />
        <Route path="/" exact component={Create} />
      </Router>
    </div>
  );
}

export default App;
