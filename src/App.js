import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calculator from './components/calculator/Calculator';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Calculator />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
