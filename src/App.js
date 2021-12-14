import React, { createContext, useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calculator from './components/Home/calculator/Calculator';
import { fetchAllResults } from './components/shared/httpRequests';
import Loading from './components/shared/Loading';
import './App.css';
import AllCards from './components/Home/AllCards/AllCards';
export const CreateResultsInfo = createContext();

function App() {
  const [resultsInfo, setResultsInfo] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [singleResult, setSingleResult] = useState('');

  useEffect(() => {
    fetchAllResults(setResultsInfo);
  }, []);

  const handleSingleResult = (data) => {
    setSingleResult(data);
    setIsOpen(true);
}

  return (
    <>
      <CreateResultsInfo.Provider 
        value={{ resultsInfo, setResultsInfo, modalIsOpen,  setIsOpen, singleResult,  handleSingleResult }}
      >
        <Router>
          <Switch>
            {resultsInfo.length ? 
              <>
                <Route exact path="/">
                  <Calculator />
                </Route>
                <Route path="/allResults">
                  <AllCards />
                </Route>
                </>
              : <Loading />
            }
          </Switch>
        </Router>
      </CreateResultsInfo.Provider>
    </>
  );
}

export default App;
