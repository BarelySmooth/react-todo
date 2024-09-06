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
        `${dueDate.getFullYear()}-${
          dueDate.getMonth() + 1
        }-${dueDate.getDate()}`
      );

      setPriority(appState.currentOpenedTodo.priority);
    }
  }, [appState.currentOpenedTodo]);

  return (
    <dialog
      id="todo-details-modal"
      className={`${styles.todoDetailsModal} animate__bounceIn`}
    >
      <div className={styles.topFlexContainer}>
        <div className={styles.editTodoHeading}>Edit Todo</div>
        {/* The browser autofocuses on this leaving a pretty distracting UI element */}
        <Button
          variant="contained"
          className={styles.todoDetailsModalCloseButton}
          onClick={handleClose}
          disableElevation
        >
          Close
        </Button>
      </div>

      {/* TODO: Redo this form. It isn't supposed to work like this. Use React state to keep track of form data */}
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
          InputProps={{
            inputComponent: "textarea",
            rows: 10,
            multiline: true,
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
            variant="contained"
            className={styles.todoDetailsModalSaveButton}
            onClick={handleClose}
          >
            Save
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default TodoDetailsModal;
