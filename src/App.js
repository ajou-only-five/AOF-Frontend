import "./App.css";
import "./styles/Modal.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./page/MainPage/MainPage";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
