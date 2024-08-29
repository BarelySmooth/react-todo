import { useContext } from "react";
import { AppContext } from "../../App";

import styles from "./TodoFolders.module.css";

const TodoFolders = () => {
  const { appState, setAppState } = useContext(AppContext);
  return (
    <div className={styles.todo_folders_container}>
      {appState.topLevelHierarchy.map((item) => {
        return (
          <div className={styles.levelOneHierarchyItemContainer} key={item}>
            {/* Case 1: Item is group list. Case 2: Item is Sub list (else condition) */}
            {item.search("group_list") >= 0 ? (
              <div className={`${styles.groupList} ${styles.levelOneItem}`}>
                <span>
                  {
                    appState.groupLists.find(
                      (groupList) => groupList.id === item
                    ).title
                  }
                </span>
                <br />
                <div className={styles.levelTwoItemsContainer}>
                  {appState.groupLists
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
                          appState.subLists.find(
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
                {appState.subLists.find((subList) => subList.id === item).title}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodoFolders;
