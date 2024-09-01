import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { TodoContext } from "../../contexts/TodoContext";

import styles from "./TodoFolders.module.css";

const TodoFolders = () => {
  const { appState, setAppState } = useContext(AppContext);
  const { todoState, setTodoState } = useContext(TodoContext);

  return (
    <div className={styles.todo_folders_container}>
      {todoState.topLevelHierarchy.map((item) => {
        return (
          <div className={styles.levelOneHierarchyItemContainer} key={item}>
            {/* Case 1: Item is group list. Case 2: Item is Sub list (else condition) */}
            {item.search("group_list") >= 0 ? (
              <div className={`${styles.groupList} ${styles.levelOneItem}`}>
                <span>
                  {
                    todoState.groupLists.find(
                      (groupList) => groupList.id === item
                    ).title
                  }
                </span>
                <br />
                <div className={styles.levelTwoItemsContainer}>
                  {todoState.groupLists
                    .find((groupList) => groupList.id === item)
                    .subLists.map((subListID) => (
                      <div
                        className={`${styles.subList} ${styles.levelTwoItem} ${
                          appState.currentSelectedTab.id === subListID
                            ? styles.sublist_selected
                            : ""
                        }`}
                        key={subListID}
                        onClick={() => {
                          setAppState((prevState) => {
                            return {
                              ...prevState,
                              currentSelectedTab: {
                                tabType: "user_list",
                                id: subListID,
                              },
                            };
                          });
                        }}
                      >
                        {
                          todoState.subLists.find(
                            (subList) => subList.id === subListID
                          ).title
                        }
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div
                className={`${styles.subList} ${styles.levelOneItem} ${
                  appState.currentSelectedTab.id === item
                    ? styles.sublist_selected
                    : ""
                }`}
                onClick={() => {
                  setAppState((prevState) => {
                    return {
                      ...prevState,
                      currentSelectedTab: {
                        tabType: "user_list",
                        id: item,
                      },
                    };
                  });
                }}
              >
                {
                  todoState.subLists.find((subList) => subList.id === item)
                    .title
                }
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodoFolders;
