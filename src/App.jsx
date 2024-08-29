import React, { useState, createContext, useEffect } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";
import "./App.css";

export const AppContext = createContext();

function App() {
  //TODO: Change placeholder value to actual state (loaded from localstorage)
  const [appState, setAppState] = useState({
    todos: [],
    currentSelectedTab: {
      tabType: "dynamic", // either dynamic or userList
      id: "today",
    },
  });
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
