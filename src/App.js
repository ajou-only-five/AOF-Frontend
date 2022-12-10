import "./App.css";
import "./styles/Modal.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./page/MainPage/MainPage";
import { UserProvider } from "./context/userContext";
import { TodoListProvider } from "./context/todoListContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <TodoListProvider>
            <Routes>
              <Route exact path="/" element={<MainPage />} />
            </Routes>
          </TodoListProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
