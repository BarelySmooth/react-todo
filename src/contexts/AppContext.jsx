import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [appState, setAppState] = useState({
    currentSelectedTab: { tabType: "dynamic", id: "today" },
    currentModalType: null,
    currentOpenedTodo: null,
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {props.children}
    </AppContext.Provider>
  );
};
