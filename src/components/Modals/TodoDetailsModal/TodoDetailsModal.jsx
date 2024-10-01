import { useEffect, useState, useContext } from "react";
import styles from "./TodoDetailsModal.module.css";
import placeholderTodoData from "../../../placeholderTodoData.json";
import { AppContext } from "../../../contexts/AppContext";
import { TodoContext } from "../../../contexts/TodoContext";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v1 as uuidv1 } from "uuid";
import { type } from "@testing-library/user-event/dist/type";

// This modal will be used to add/edit tasks. It will be opened when the user clicks on a task or the FAB.
const TodoDetailsModal = ({ modalOpen }) => {
  const { appState, setAppState } = useContext(AppContext);
  const { todoState, setTodoState } = useContext(TodoContext);

  useEffect(() => {
    const todoDetailsModal = document.getElementById("todo-details-modal");
    if (modalOpen) {
      todoDetailsModal.classList.add("animate__bounceIn");
      document.getElementById("todo-details-modal")?.showModal();
    } else {
      document.getElementById("todo-details-modal").close();
    }
  }, [modalOpen]);

  const handleSave = () => {
    const updatedTodo = {
      ...appState.currentOpenedTodo,
      title: todoTitle,
      description: todoDescription,
      dueDate: new Date(todoDueDate).toISOString(),
      priority: priority,
    };
    setTodoState({
      ...todoState,
      todos: [
        ...todoState.todos.map((todo) => {
          if (todo.id === appState.currentOpenedTodo.id) {
            return updatedTodo;
          } else {
            return todo;
          }
        }),
      ],
    });
    setAppState({
      ...appState,
      currentModal: null,
      currentOpenedTodo: null,
    });
  };

  const handleCreate = () => {
    // get ID for new todo
    let newTodoID;
    do {
      newTodoID = "todo_" + uuidv1();
    } while (todoState.todos.find((todo) => todo.id === newTodoID));

    const newTodo = {
      id: newTodoID,
      type: "todo",
      parentID: appState.currentSelectedTab.id,
      title: todoTitle,
      description: todoDescription,
      dueDate: new Date(todoDueDate).toISOString(),
      priority: priority,
      completed: false,
    };

    // updated subLists
    const parentSublistID = appState.currentSelectedTab.id;
    const updatedSublistArray = todoState.subLists.map((sublist) => {
      if (sublist.id === parentSublistID) {
        return {
          ...sublist,
          todos: [...sublist.todos, newTodoID],
        };
      } else {
        return sublist;
      }
    });

    setTodoState({
      ...todoState,
      subLists: updatedSublistArray,
      todos: [...todoState.todos, newTodo],
    });
    setAppState({
      ...appState,
      currentModal: null,
      currentOpenedTodo: null,
    });
  };

  // If the user clicks escape, the modal automatically closes. Here we are updating the state, so that it keeps up with what actually happens.
  // When the user clicks the escape key, the intended behaviour is to close the modal without saving. Here, the above handleSave() function isn't called, and hence no saving happens.
  /*  BUG: Clicking Escape while the modal is open causes the app to go back to the "Today" tab.
  This is probably because the appState gets reset to its original value (most likely caused by a re-render of the <AppContext /> component, which is in turn caused by its child components updating)
  While this can technically be mitigated by setting the currentOpenTab to the previous stored value in the below function call, that would be BADCODE imo. 
  Temporarily removing this piece of code, since the afforementioned bug happens even when the save button is clicked. */
  // useEffect(() => {
  //   document
  //     .getElementById("todo-details-modal")
  //     ?.addEventListener("close", () => {
  //       setAppState({
  //         ...appState,
  //         currentModal: null,
  //         currentOpenedTodo: null,
  //       });
  //     });
  // }, []);

  const handleDelete = () => {
    //same as closing the modal... except this time, we delete the todo also!

    const parentSublistID = appState.currentOpenedTodo.parentID;
    setTodoState({
      ...todoState,
      todos: [
        ...todoState.todos.filter(
          (todo) => todo.id !== appState.currentOpenedTodo.id
        ),
      ],
      //you've also got to clear the deleted todo from its corresponding sublist
      subLists: [
        ...todoState.subLists.map((sublist) => {
          if (sublist.id === parentSublistID) {
            // remove todo
            const updatedSublist = {
              ...sublist,
              todos: [
                ...sublist.todos.filter(
                  (todoID) => todoID !== appState.currentOpenedTodo.id
                ),
              ],
            };
            return updatedSublist;
          } else {
            return sublist;
          }
        }),
      ],
    });

    setAppState({
      ...appState,
      currentModal: null,
      currentOpenedTodo: null,
    });
  };

  const makeDoubleDigit = (num) => (num < 10 ? `0${num}` : num);

  // Form states
  const [todoTitle, setTodoTitle] = useState();
  const [todoDescription, setTodoDescription] = useState();
  const [todoDueDate, setTodoDueDate] = useState();
  const [priority, setPriority] = useState();

  // Set form states when a new todo is opened
  useEffect(() => {
    if (appState.currentOpenedTodo) {
      setTodoTitle(appState.currentOpenedTodo.title);
      setTodoDescription(appState.currentOpenedTodo.description);

      let dueDate = new Date(appState.currentOpenedTodo.dueDate);
      setTodoDueDate(
        `${dueDate.getFullYear()}-${makeDoubleDigit(
          dueDate.getMonth() + 1
        )}-${makeDoubleDigit(dueDate.getDate())}`
      );

      setPriority(appState.currentOpenedTodo.priority);
    } else {
      setTodoTitle("");
      setTodoDescription("");

      let dueDate = new Date("2025-12-31T00:00:00.000Z"); //TODO: Change this default due date to something more sensible
      setTodoDueDate(
        `${dueDate.getFullYear()}-${makeDoubleDigit(
          dueDate.getMonth() + 1
        )}-${makeDoubleDigit(dueDate.getDate())}`
      );
      setPriority("high");
    }
  }, [appState.currentModal]);

  return (
    <dialog
      id="todo-details-modal"
      className={`${styles.todoDetailsModal} ${
        appState.currentModal?.action === "edit_todo"
          ? styles.editTodoModal
          : styles.addTodoModal
      }`}
    >
      <div className={styles.titleFlexContainer}>
        <div className={styles.todoDetailsModalHeading}>
          {appState.currentModal?.action === "edit_todo" ? "Edit" : "Add"} Todo
        </div>
        <IconButton
          className={styles.closeButton}
          onClick={() => {
            setAppState({
              ...appState,
              currentModal: null,
              currentOpenedTodo: null,
            });
          }}
        >
          <span class="material-symbols-outlined">close</span>
        </IconButton>
      </div>

      <form>
        <TextField
          className={`${styles.todoTitleTextField} ${styles.formElement}`}
          label="Todo Title"
          variant="outlined"
          required
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          fullWidth
        />
        <TextField
          className={`${styles.todoDescriptionTextField} ${styles.formElement}`}
          label="Todo Description"
          variant="filled"
          required={false}
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          size="small"
          fullWidth
          // cannot use multiline here: https://github.com/mui/base-ui/issues/167
          // multiline
          // minRows={4}
          // maxRows={15}
          // so, using a workaround...
          slotProps={{
            input: { inputComponent: "textarea", rows: 10, multiline: true },
          }}
        />
        <div className={styles.dueDatePriorityFlexContainer}>
          {/* BUG: User is able to press backspace key while focused on Date field. This causes the date to get deleted. */}
          <TextField
            id="date"
            className={`${styles.formElement}`}
            label="Due Date"
            type="date"
            value={todoDueDate}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              setTodoDueDate(
                `${newDate.getFullYear()}-${makeDoubleDigit(
                  newDate.getMonth() + 1
                )}-${makeDoubleDigit(newDate.getDate())}`
              );
            }}
          />
          <FormControl>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              value={priority}
              label="Priority"
              native
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </FormControl>
        </div>

        <div className={styles.saveButtonFlexContainer}>
          <Button
            variant="text"
            className={styles.deleteButton}
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            className={styles.saveButton}
            onClick={
              appState.currentModal?.action === "edit_todo"
                ? handleSave
                : handleCreate
            }
          >
            Save
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default TodoDetailsModal;
