import React, { useState } from "react";

import Toolbar from "../components/Sidebar/Toolbar";
import MyModal from "../components/Modal/MyModal";
import Login from "../components/Login/Login";

import "../styles/MainPage.css";

import CalendarNavigator from "../components/CalendarNavigator/CalendarNavigator";
import MyChart from "../components/Chart/MyChart";
import Quotes from "../components/Quotes/Quotes.jsx";

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
      <div>
        <MyChart />
      </div>
      {/* sidemenu */}
      <div>
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
      {/* quotes */}
      <Quotes />
    </div>
  );
}

export default Mainpage;
