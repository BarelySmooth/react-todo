import { useEffect, useContext } from "react";
import styles from "./IntroModal.module.css";
import placeholderTodoData from "../../../placeholderTodoData.json";
import { AppContext } from "../../../contexts/AppContext";
import { TodoContext } from "../../../contexts/TodoContext";
import profilePicture from "../../../barelysmooth.png";

const IntroModal = ({ modalOpen }) => {
  const { appState, setAppState } = useContext(AppContext);
  const { todoState, setTodoState } = useContext(TodoContext);

  useEffect(() => {
    console.log(modalOpen);
    if (modalOpen) {
      console.log(document.getElementById("intro-modal"));
      document.getElementById("intro-modal")?.showModal();
      document.getElementById("intro-modal-close-button")?.focus();
    } else {
      document.getElementById("intro-modal").close();
    }
  }, [modalOpen]);

  useEffect(() => {
    if (localStorage.init) {
      console.log("Local storage already initialized");
    } else {
      console.log("Initializing local storage");
      setAppState({
        ...appState,
        currentModal: { type: "introModal" },
      });
    }
  }, []);

  const handleIntroModalClose = () => {
    localStorage.setItem("init", true);
    localStorage.setItem("todoData", JSON.stringify(placeholderTodoData));
    setTodoState(JSON.parse(localStorage.getItem("todoData")));
  };

  /* 
     TODO: User is able to bypass modal by clicking escape key. 
     Ideally this should initialize the todo state (identical to the behaviour when close button is pressed).
     This is observerd in all other modals, too.
  */

  return (
    <dialog
      id="intro-modal"
      className={`${styles.introModal} animate__bounceIn`}
    >
      <h1 className={styles.introModalWelcomeHeading}>Welcome to Todo!</h1>
      <div className={styles.introModalFlexContainer}>
        <img
          src={profilePicture}
          alt="The Developer's Profile Picture"
          width={100}
        />
        <div>
          <p className={styles.introModalParagraph}>
            Hi, I'm BarelySmooth — the developer behind Todo. I made this as a
            fun project to get a hold of React, and I hope you'll have a fun
            time using it. Feel free to post any feedback or suggestions on{" "}
            <a
              href="https://github.com/BarelySmooth/react-todo"
              target="_blank"
            >
              the Github repo
            </a>
            .
          </p>
          <p className={styles.introModalParagraph}>
            PS: Todo stores your data locally in your browser, and it isn't
            transmitted over the internet. However, this also means that you
            will lose your data if you clear this site's LocalStorage.
          </p>
        </div>
      </div>
      <button
        className={styles.introModalCloseButton}
        id="intro-modal-close-button"
        onClick={() => {
          handleIntroModalClose();
          document.getElementById("intro-modal").close();
        }}
      >
        Close
      </button>
    </dialog>
  );
};

export default IntroModal;
