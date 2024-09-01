import styles from "./Board.module.css";
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { TodoContext } from "../../contexts/TodoContext";

const Board = () => {
  const arrayOfBuiltInLists = [
    { key: "today", value: "For today", icon: "today" },
    { key: "all", value: "All todos", icon: "clear_all" },
    { key: "important", value: "Important Todos", icon: "assignment_late" },
    { key: "due_soon", value: "Due Soon", icon: "history" },
    { key: "backlog", value: "Backlog", icon: "ac_unit" },
  ];
  const { appState, setAppState } = useContext(AppContext);
  const { todoState, setTodoState } = useContext(TodoContext);

  return (
    <div className={styles.board}>
      {/* Display only if currentSelected tab is a dynamic list */}
      {appState.currentSelectedTab.tabType === "dynamic" &&
        arrayOfBuiltInLists.map((builtInList) => {
          if (builtInList.key === appState.currentSelectedTab.id) {
            return <h1 key={builtInList.key}>{builtInList.value}</h1>;
          } else {
            return null;
          }
        })}
      {/* Display only if  current selected tab is a user list */}
      {appState.currentSelectedTab.tabType === "user_list" && (
        <h1>
          {
            todoState.subLists.find(
              (subList) => subList.id === appState.currentSelectedTab.id
            ).title
          }
        </h1>
      )}
    </div>
  );
};

export default Board;
