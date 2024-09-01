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

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoState));
  }, [todoState]);

  useEffect(() => {
    if (localStorage.init) {
      console.log("Local storage already initialized");
    } else {
      console.log("Initializing local storage");
      localStorage.setItem("init", true);
      localStorage.setItem("todoData", JSON.stringify(placeholderTodoData));
      setTodoState(JSON.parse(localStorage.getItem("todoData")));
    }
  }, []);

  return (
    <TodoContext.Provider value={{ todoState, setTodoState }}>
      {props.children}
    </TodoContext.Provider>
  );
};
