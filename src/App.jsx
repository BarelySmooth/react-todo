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

  const appStateLoadedFromLocalStorage = JSON.parse(
    localStorage.getItem("appState")
  );
  // When page is refreshed, the user should be sent back to the "today" tab
  if (appStateLoadedFromLocalStorage) {
    appStateLoadedFromLocalStorage.currentSelectedTab = {
      tabType: "dynamic",
      id: "today",
    };
  }
  const [appState, setAppState] = useState(
    appStateLoadedFromLocalStorage || placeholderData
  );

  const providerValue = { appState, setAppState };

  useEffect(() => {
    console.log("App rendered");

    if (localStorage.init) {
      console.log("Local storage already initialized");
    } else {
      console.log("Initializing local storage");
      localStorage.setItem("init", true);
      localStorage.setItem("appState", JSON.stringify(placeholderData));
      setAppState(JSON.parse(localStorage.getItem("appState")));
    }
  }, []);

  // save data to local storage
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

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
