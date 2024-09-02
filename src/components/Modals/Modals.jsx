import React, { useContext, useEffect } from "react";
import IntroModal from "./IntroModal/IntroModal";
import TodoDetailsModal from "./TodoDetailsModal/TodoDetailsModal";
import { AppContext } from "../../contexts/AppContext";
import { TodoContext } from "../../contexts/TodoContext";

const Modals = () => {
  const { appState, setAppState } = useContext(AppContext);

  return (
    <div>
      <IntroModal modalOpen={appState.currentModal?.type === "introModal"} />
      <TodoDetailsModal
        modalOpen={appState.currentModal?.type === "todo_details"}
      />
    </div>
  );
};

export default Modals;
