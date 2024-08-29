import React, { useState, createContext, useEffect } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";
import "./App.css";
import placeholderData from "./placeholderData.json";

export const AppContext = createContext();

function App() {
  /* Here's the hierarchy:
      -- Dynamic Lists

      -- User's Lists
         |-- Group Lists
             |-- Sub Lists (can exist under group as well as standalone)
  
  */

  //TODO: Change placeholder value to actual state (loaded from localstorage)
  const [appState, setAppState] = useState(placeholderData);

  const providerValue = { appState, setAppState };

  useEffect(() => {
    console.log("App rendered");
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={providerValue}>
        <Sidebar />
        <Board />
      </AppContext.Provider>
    </div>
  );
}

export default App;
