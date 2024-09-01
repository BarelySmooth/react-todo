import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";
import "./App.css";
import { TodoContextProvider } from "./contexts/TodoContext";
import { AppContextProvider } from "./contexts/AppContext";

function App() {
  /* Here's the hierarchy:
      -- Dynamic Lists

      -- User's Lists
         |-- Group Lists
             |-- Sub Lists (can exist under group as well as standalone)
  
  */

  // When page is refreshed, the user should be sent back to the "today" tab
  // if (todoDataLoadedFromLocalStorage) {
  //   todoDataLoadedFromLocalStorage.currentSelectedTab = {
  //     tabType: "dynamic",
  //     id: "today",
  //   };
  // }

  // const [appState, setAppState] = useState(
  //   appStateLoadedFromLocalStorage || placeholderData
  // );

  // save data to local storage

  return (
    <div className="App">
      <TodoContextProvider>
        <AppContextProvider>
          <Sidebar />
          <Board />
        </AppContextProvider>
      </TodoContextProvider>
    </div>
  );
}

export default App;
