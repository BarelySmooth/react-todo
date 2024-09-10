import { useEffect, useState, useContext } from "react";
import styles from "./TodoDetailsModal.module.css";
import placeholderTodoData from "../../../placeholderTodoData.json";
import { AppContext } from "../../../contexts/AppContext";
import { TodoContext } from "../../../contexts/TodoContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TodoDetailsModal = ({ modalOpen }) => {
  const { appState, setAppState } = useContext(AppContext);
  const { todoState, setTodoState } = useContext(TodoContext);

  useEffect(() => {
    const todoDetailsModal = document.getElementById("todo-details-modal");
    if (modalOpen) {
      console.log(document.getElementById("todo-details-modal"));
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
    console.log("prev state", appState);
    setAppState({
      ...appState,
      currentModal: null,
      currentOpenedTodo: null,
    });
    console.log("new state", appState);
  };

  // If the user clicks escape, the modal automatically closes. Here we are updating the state, so that it keeps up with what actually happens.
  // When the user clicks the escape key, the intended behaviour is to close the modal without saving. Here, the above handleSave() function isn't called, and hence no saving happens.
  /*  BUG: Clicking Escape while the modal is open causes the app to go back to the "Today" tab.
  This is probably because the appState gets reset to its original value (most likely caused by a re-render of the <AppContext /> component, which is in turn caused by its child components updating)
  While this can technically be mitigated by setting the currentOpenTab to the previous stored value in the below function call, that would be BADCODE imo. */
  useEffect(() => {
    document
      .getElementById("todo-details-modal")
      ?.addEventListener("close", () => {
        setAppState({
          ...appState,
          currentModal: null,
          currentOpenedTodo: null,
        });
      });
  }, []);

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
  const [todoTitle, setTodoTitle] = useState(appState.currentOpenedTodo?.title);
  const [todoDescription, setTodoDescription] = useState(
    appState.currentOpenedTodo?.description
  );
  let dueDate = new Date(appState.currentOpenedTodo?.dueDate);
  const [todoDueDate, setTodoDueDate] = useState(
    `${dueDate.getFullYear()}-${makeDoubleDigit(
      dueDate.getMonth() + 1
    )}-${makeDoubleDigit(dueDate.getDate())}`
  );
  const [priority, setPriority] = useState(
    // this is so that MUI doesn't yell at me for supplying an undefined value, which is not in the select dropdown
    appState.currentOpenedTodo?.priority ?? "low"
  );

  useEffect(() => {
    if (appState.currentOpenedTodo) {
      setTodoTitle(appState.currentOpenedTodo.title);
      setTodoDescription(appState.currentOpenedTodo.description);

      let dueDate = new Date(appState.currentOpenedTodo?.dueDate);
      setTodoDueDate(
        `${dueDate.getFullYear()}-${makeDoubleDigit(
          dueDate.getMonth() + 1
        )}-${makeDoubleDigit(dueDate.getDate())}`
      );

      setPriority(appState.currentOpenedTodo.priority);
    }
  }, [appState.currentOpenedTodo]);

  return (
    <dialog id="todo-details-modal" className={`${styles.todoDetailsModal}`}>
      <div className={styles.editTodoHeading}>Edit Todo</div>

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
              console.log(e.target.value);
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
            className={styles.todoDetailsModalDeleteButton}
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            className={styles.todoDetailsModalSaveButton}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default TodoDetailsModal;
