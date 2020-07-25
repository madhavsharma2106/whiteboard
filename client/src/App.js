import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EnterRoom from "./components/EnterRoom/EnterRoom";
import Room from "./components/Room/Room";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/room">
          <Room />
        </Route>
        <Route path="/">
          <EnterRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
