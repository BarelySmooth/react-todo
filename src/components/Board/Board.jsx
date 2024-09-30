import styles from "./Board.module.css";
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { TodoContext } from "../../contexts/TodoContext";
import Modals from "../Modals/Modals";
import Fab from "@mui/material/Fab";

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
      <Modals />
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

      {/* Display Todos */}
      <div className={styles.todosContainer}>
        {/* Case 1: User List */}
        {appState.currentSelectedTab.tabType === "user_list" &&
          todoState.subLists
            .find((subList) => subList.id === appState.currentSelectedTab.id)
            .todos.map((todo_id) => {
              const todoDetails = todoState.todos.find(
                (todo) => todo.id === todo_id
              );
              return (
                <div
                  className={styles.todoItem}
                  key={todo_id}
                  onClick={() => {
                    setAppState({
                      ...appState,
                      currentModal: {
                        type: "todo_details",
                        action: "edit_todo",
                      },
                      currentOpenedTodo: todoDetails,
                    });
                  }}
                >
                  {todoDetails.title}
                </div>
              );
            })}
      </div>
      <Fab
        color="primary"
        aria-label="add"
        className={styles.fabAddButton}
        variant="circular"
        onClick={() => {
          setAppState({
            ...appState,
            currentModal: {
              type: "todo_details",
              action: "add_todo",
            },
            currentOpenedTodo: null,
          });
        }}
        style={{
          display:
            appState.currentSelectedTab.tabType === "user_list"
              ? "flex"
              : "none",
        }}
      >
        <span className="material-symbols-outlined">add</span>
      </Fab>
    </div>
  );
};

export default Board;
