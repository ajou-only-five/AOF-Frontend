import "./App.css";
import "./styles/Modal.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./page/MainPage/MainPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
