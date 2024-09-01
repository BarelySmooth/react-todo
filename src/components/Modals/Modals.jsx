import React, { useContext, useEffect } from "react";
import IntroModal from "./IntroModal/IntroModal";
import { AppContext } from "../../contexts/AppContext";
import { TodoContext } from "../../contexts/TodoContext";

const Modals = () => {
  const { appState, setAppState } = useContext(AppContext);

  return (
    <div>
      <IntroModal modalOpen={appState.currentModal?.type === "introModal"} />
    </div>
  );
};

export default Modals;
