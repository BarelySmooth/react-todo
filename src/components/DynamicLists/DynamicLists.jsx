import styles from "./DynamicLists.module.css";

const DynamicLists = () => {
  const arrayOfBuiltInLists = [
    { key: "today", value: "For today", icon: "today" },
    { key: "all", value: "All todos", icon: "clear_all" },
    { key: "important", value: "Important Todos", icon: "assignment_late" },
    { key: "due_soon", value: "Due Soon", icon: "history" },
    { key: "backlog", value: "Backlog", icon: "ac_unit" },
  ];

  return (
    <ul className={styles.dynamic_lists}>
      {arrayOfBuiltInLists.map((listItem) => {
        return (
          <li key={listItem.key}>
            {/* prettier-ignore */}
            <span className={`material-symbols-outlined  ${styles.dynamic_list_item_icon}`}>{listItem.icon}</span>
            <span>{listItem.value}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default DynamicLists;
