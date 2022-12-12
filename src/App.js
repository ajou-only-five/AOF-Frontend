import "./App.css";
import "./styles/Modal.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import MainPage from "./page/MainPage/MainPage";
import { UserProvider } from "./context/userContext";
import { TodoListProvider } from "./context/todoListContext";
import { FriendListProvider } from "./context/friendListContext";
import { OnlyFiveProvider } from "./context/onlyFiveContext";
import { DateProvider } from "./context/dateContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="App">
        <DateProvider>
          <UserProvider>
            <TodoListProvider>
              <FriendListProvider>
                <OnlyFiveProvider>
                  <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route exact path="/:id" element={<MainPage />} />
                  </Routes>
                </OnlyFiveProvider>
              </FriendListProvider>
            </TodoListProvider>
          </UserProvider>
        </DateProvider>
      </div>
    </Router>
  );
}

export default App;
