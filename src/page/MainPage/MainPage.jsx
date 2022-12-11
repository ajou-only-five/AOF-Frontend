import React, { useState, useEffect } from "react";

import Toolbar from "../../components/Sidebar/Toolbar";
import MyModal from "../../components/Modal/MyModal";
import Login from "../../components/Login/Login";
import Register from "../../components/Login/Register";

import "../../styles/MainPage.css";

import MyChart from "../../components/Chart/MyChart";
import Quotes from "../../components/Quotes/Quotes.jsx";
import TodayTodoList from "../../components/Todo/TodayTodoList";
import CalendarNav from "../../components/CalendarNavigator/CalendarNav";
import TodoList from "../../components/Todo/TodoList.jsx";
import MonthPicker from "../../components/MonthPicker/MonthPicker";

import newTodoList from "./newTodoList.json"; // 임시 데이터

import { todoListFormat } from "../../js/todoListFormat";
import axios from "axios";
import { server_debug } from "../../js/server_url";

function Mainpage() {
  const [isLogined, setIsLogined] = useState(false); // false
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);

  const [todoModalIsOpen, setTodoModalIsOpen] = useState(false);
  const [todoData, setTodoData] = useState([]);

  const today = new Date();
  const todayDate = today.getDate() - 1;

  // 추후 API 요청을 위한 설정 년도
  const [todoYear, setTodoYear] = useState(today.getFullYear());
  // 추후 API 요청을 위한 설정 월
  const [todoMonth, setTodoMonth] = useState(today.getMonth() + 1);
  // 설정 년 월에 따른 마지막 날짜
  const [maxDate, setMaxDate] = useState(
    new Date(todoYear, todoMonth, 0).getDate()
  );

  const [todoFormatList, setTodoFormatList] = useState(
    todoListFormat(newTodoList, maxDate)
  );

  // 설정 년 월에 따른 마지막 날짜 변동
  useEffect(() => {
    setMaxDate(new Date(todoYear, todoMonth, 0).getDate());
    // setTodoFormatList(todoListFormat(TODOLIST_GET_FROM_API, maxDate))
  }, [todoYear, todoMonth]);

  const toggleIsLogined = () => {
    setIsLogined(!isLogined);
  };

  const getTdodData = async (e) => {
    await axios
      .get(`${server_debug}`,{ params:{date: today} }) // { headers: { Authorization: `${accessToken}`}, params:{date: timestamp}}
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => alert(err));
  };
  getTdodData();

  return (
    <div>
      {isLogined ? (
        <div>
          {/* chart TopCenter */}
          <MyChart />

          {/* quotes LeftCenter */}
          <Quotes />

          {/* TodatTodoList RightCenter */}
          <TodayTodoList todoList={todoFormatList[todayDate]} />

          {/* CalendarNav TopCenter */}
          {/* <CalendarNav
            setTodoModalIsOpen={setTodoModalIsOpen}
            setTodoData={setTodoData}
            todoList={todoList}
          /> */}
          <CalendarNav
            setTodoModalIsOpen={setTodoModalIsOpen}
            setTodoData={setTodoData}
            todoList={todoFormatList}
          />
          {todoModalIsOpen && (
            <MyModal
              isAnimation={true}
              setIsOpen={setTodoModalIsOpen}
              isLogined={isLogined}
              setIsLogined={setIsLogined}
              el={<TodoList data={todoData} />}
            />
          )}

          <MonthPicker
            todoYear={todoYear}
            todoMonth={todoMonth}
            setTodoYear={setTodoYear}
            setTodoMonth={setTodoMonth}
          />

          {/* sidemenu */}
          <Toolbar isLogined={isLogined} toggleIsLogined={toggleIsLogined} />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            display: "flex",
            gap: 10,
          }}
        >
          <div
            onClick={() => {
              setLoginIsOpen(true);
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
          <div
            onClick={() => {
              setRegisterIsOpen(true);
            }}
          >
            회원가입
          </div>
          {registerIsOpen && (
            <MyModal
              setIsOpen={setRegisterIsOpen}
              el={
                <Register
                  toggleIsLogined={toggleIsLogined}
                  setIsOpen={setRegisterIsOpen}
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
