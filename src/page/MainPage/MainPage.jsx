import React, { useState, useEffect } from "react";

import Toolbar from "../../components/Sidebar/Toolbar";
import MyModal from "../../components/Modal/MyModal";
import Login from "../../components/Login/Login";

import "../../styles/MainPage.css";

import MyChart from "../../components/Chart/MyChart";
import Quotes from "../../components/Quotes/Quotes.jsx";
import TodayTodoList from "../../components/Todo/TodayTodoList";
import CalendarNav from "../../components/CalendarNavigator/CalendarNav";
import TodoList from "../../components/Todo/TodoList.jsx";
import MonthPicker from "../../components/MonthPicker/MonthPicker";

function Mainpage() {
  const [isLogined, setIsLogined] = useState(true);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  const [todoModalIsOpen, setTodoModalIsOpen] = useState(false);
  const [todoData, setTodoData] = useState([]);

  const toggleIsLogined = () => {
    setIsLogined(!isLogined);
  };

  const showLoginModal = () => {
    setLoginIsOpen(true);
  };

  return (
    <div>
      {isLogined ? (
        <div>
          {/* chart TopCenter */}
          <MyChart />

          {/* quotes LeftCenter */}
          <Quotes />

          {/* TodatTodoList RightCenter */}
          <TodayTodoList />

          {/* CalendarNav TopCenter */}
          <CalendarNav
            setTodoModalIsOpen={setTodoModalIsOpen}
            setTodoData={setTodoData}
          />
          {todoModalIsOpen && (
            <MyModal
              isAnimation={true}
              setIsOpen={setTodoModalIsOpen}
              el={<TodoList data={todoData} />}
            />
          )}

          <MonthPicker />

          {/* sidemenu */}
          <Toolbar isLogined={isLogined} toggleIsLogined={toggleIsLogined} />
        </div>
      ) : (
        <div>
          <div
            onClick={() => {
              setLoginIsOpen(true);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50% -50%)",
            }}
          >
            로그인
          </div>
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
      )}
    </div>
  );
}

export default Mainpage;
