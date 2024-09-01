import React, { useState, useEffect, createContext } from "react";
import placeholderTodoData from "../placeholderTodoData.json";

export const TodoContext = createContext();

export const TodoContextProvider = (props) => {
  const todoDataLoadedFromLocalStorage = JSON.parse(
    localStorage.getItem("todoData")
  );

  const [todoState, setTodoState] = useState(
    todoDataLoadedFromLocalStorage || placeholderTodoData
  );

  // save data to local storage when state changes
  useEffect(() => {
    if (localStorage.init) {
      localStorage.setItem("todoData", JSON.stringify(todoState));
    }
  }, [todoState]);

  return (
    <TodoContext.Provider value={{ todoState, setTodoState }}>
      {props.children}
    </TodoContext.Provider>
  );
};
