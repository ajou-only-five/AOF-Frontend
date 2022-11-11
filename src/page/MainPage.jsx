import React, { useState } from "react";

import Toolbar from "../components/Sidebar/Toolbar";
import MyModal from "../components/Modal/MyModal";
import Login from "../components/Login/Login";

import "../styles/MainPage.css";

import CalendarNavigator from "../components/CalendarNavigator/CalendarNavigator";
import MyChart from "../components/Chart/MyChart";
import Quotes from "../components/Quotes/Quotes.jsx";
import TodayTodoList from "../components/Todo/TodayTodoList";

function Mainpage() {
  const [isLogined, setIsLogined] = useState(true);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  const toggleIsLogined = () => {
    setIsLogined(!isLogined);
  };

  const showLoginModal = () => {
    setLoginIsOpen(true);
  };

  return (
    <div>
      {/* chart */}
      <MyChart />

      {/* quotes */}
      <Quotes />

      <TodayTodoList />

      {/* sidemenu */}
      <Toolbar
        isLogined={isLogined}
        toggleIsLogined={toggleIsLogined}
        showLoginModal={showLoginModal}
      />
      {loginIsOpen && (
        <MyModal
          setIsOpen={setLoginIsOpen}
          el={
            <Login
              toggleIsLogined={toggleIsLogined}
              setIsOpen={setLoginIsOpen}
            />
          }
        />
      )}
    </div>
  );
}

export default Mainpage;
