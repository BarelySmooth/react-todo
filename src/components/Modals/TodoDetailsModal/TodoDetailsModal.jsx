import { useEffect, useContext } from "react";
import styles from "./TodoDetailsModal.module.css";
import placeholderTodoData from "../../../placeholderTodoData.json";
import { AppContext } from "../../../contexts/AppContext";
import { TodoContext } from "../../../contexts/TodoContext";
import profilePicture from "../../../barelysmooth.png";

const TodoDetailsModal = ({ modalOpen }) => {
  const { appState, setAppState } = useContext(AppContext);
  const { todoState, setTodoState } = useContext(TodoContext);

  useEffect(() => {
    if (modalOpen) {
      console.log(document.getElementById("todo-details-modal"));
      document.getElementById("todo-details-modal")?.showModal();
    } else {
      document.getElementById("todo-details-modal").close();
    }
  }, [modalOpen]);

  const handleClose = () => {
    setAppState({
      ...appState,
      currentModal: null,
      currentOpenedTodo: null,
    });
  };

  return (
    <dialog
      id="todo-details-modal"
      className={`${styles.todoDetailsModal} animate__bounceIn`}
    >
      {appState.currentOpenedTodo?.title}
      <button
        className={styles.todoDetailsModalCloseButton}
        onClick={handleClose}
      >
        Close
      </button>
    </dialog>
  );
};

export default TodoDetailsModal;
