import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calculator from './components/calculator/Calculator';
import './App.css';

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
