import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EnterRoom from "./components/EnterRoom/EnterRoom";
import WhiteBoardRoom from "./components/WhiteBoardRoom/Room";
import CodeShareRoom from "./components/CodeShareRoom/Room";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/whiteBoardRoom">
          <WhiteBoardRoom />
        </Route>
        <Route exact path="/codeShareRoom">
          <CodeShareRoom />
        </Route>
        <Route path="/">
          <EnterRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
