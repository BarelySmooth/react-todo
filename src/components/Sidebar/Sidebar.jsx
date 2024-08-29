import DynamicLists from "../DynamicLists/DynamicLists";
import TodoFolders from "../TodoFolders/TodoFolders";
import styles from "./Sidebar.module.css";
// import { AppContext } from "../../App";
// import React, { useContext } from "react";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h1>Todo</h1>
      <DynamicLists />
      <TodoFolders />
    </div>
  );
};

export default Sidebar;
