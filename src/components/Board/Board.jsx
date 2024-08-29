import styles from "./Board.module.css";
import React, { useContext } from "react";
import { AppContext } from "../../App";

const Board = () => {
  const arrayOfBuiltInLists = [
    { key: "today", value: "For today", icon: "today" },
    { key: "all", value: "All todos", icon: "clear_all" },
    { key: "important", value: "Important Todos", icon: "assignment_late" },
    { key: "due_soon", value: "Due Soon", icon: "history" },
    { key: "backlog", value: "Backlog", icon: "ac_unit" },
  ];
  const { appState, setAppState } = useContext(AppContext);

  return (
    <div className={styles.board}>
      {/* Display only if currentSelected tab is a dynamic list */}
      {appState.currentSelectedTab.tabType &&
        arrayOfBuiltInLists.map((builtInList) => {
          if (builtInList.key === appState.currentSelectedTab.id) {
            return <h1 key={builtInList.key}>{builtInList.value}</h1>;
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default Board;
