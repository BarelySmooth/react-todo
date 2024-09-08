import React, { useState, useEffect, createContext } from "react";
import placeholderTodoData from "../placeholderTodoData.json";

export const TodoContext = createContext();

export const TodoContextProvider = (props) => {
  const todoDataLoadedFromLocalStorage = JSON.parse(
    localStorage.getItem("barelysmooth_react_todo_todoData")
  );

  const [todoState, setTodoState] = useState(
    todoDataLoadedFromLocalStorage || placeholderTodoData
  );

  // save data to local storage when state changes
  useEffect(() => {
    if (localStorage.barelysmooth_react_todo_init) {
      localStorage.setItem(
        "barelysmooth_react_todo_todoData",
        JSON.stringify(todoState)
      );
    }
  }, [todoState]);

  return (
    <TodoContext.Provider value={{ todoState, setTodoState }}>
      {props.children}
    </TodoContext.Provider>
  );
};
