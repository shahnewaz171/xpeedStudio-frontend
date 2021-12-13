import React, { createContext, useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calculator from './components/ScreenA/calculator/Calculator';
import { fetchAllResults } from './components/httpRequests';
import './App.css';
export const CreateResultsInfo = createContext();

function App() {
  const [resultsInfo, setResultsInfo] = useState([]);

  useEffect(() => {
    fetchAllResults(setResultsInfo);
  }, []);

  return (
    <>
      <CreateResultsInfo.Provider value={[resultsInfo, setResultsInfo]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Calculator />
            </Route>
          </Switch>
        </Router>
      </CreateResultsInfo.Provider>
    </>
  );
}

export default App;
