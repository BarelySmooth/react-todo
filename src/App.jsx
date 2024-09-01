import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./components/Board/Board";
import "./App.css";
import { TodoContextProvider } from "./contexts/TodoContext";
import { AppContextProvider } from "./contexts/AppContext";
import "animate.css";

function App() {
  /* Here's the hierarchy:
      -- Dynamic Lists

      -- User's Lists
         |-- Group Lists
             |-- Sub Lists (can exist under group as well as standalone)
  
  */

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
