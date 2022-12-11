import "./App.css";
import "./styles/Modal.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./page/MainPage/MainPage";
import { UserProvider } from "./context/userContext";
import { TodoListProvider } from "./context/todoListContext";
import { FriendListProvider } from "./context/friendListContext";
import { OnlyFiveProvider } from "./context/onlyFiveContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <TodoListProvider>
            <FriendListProvider>
              <OnlyFiveProvider>
                <Routes>
                  <Route exact path="/" element={<MainPage />} />
                </Routes>
              </OnlyFiveProvider>
            </FriendListProvider>
          </TodoListProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
