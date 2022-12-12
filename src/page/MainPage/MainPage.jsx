import React, { useState, useEffect } from "react";
import axios from "axios";

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

import { todoListFormat } from "../../js/todoListFormat";
import useTodoListContext from "../../context/todoListContext/useTodoListContext";
import { useUserContext } from "../../context/userContext";
import { server_debug } from "../../js/server_url";
import { useDateContext } from "../../context/dateContext";

function Mainpage() {
  const { user } = useUserContext();
  const { date } = useDateContext();
  const [isLogined, setIsLogined] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);

  const [todoModalIsOpen, setTodoModalIsOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState();

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

  const { todoList, setTodoList } = useTodoListContext();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodoList = async () => {
    const params = {
      params: {
        userId: user.userId,
        year: date.year,
        month: date.month,
      },
    };

    await axios
      .get(`${server_debug}/todo/search/todoList`, params)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          // console.log(res.data);
          setTodoList(Array.from(todoListFormat(res.data, maxDate)));
        }
      })
      .catch((e) => {
        console.log(e);
        // setTodoList(Array.from(todoListFormat([], maxDate)));
      });
  };
  // 설정 년 월에 따른 마지막 날짜 변동
  useEffect(() => {
    setMaxDate(new Date(date.year, date.month, 0).getDate());

    if (user.userId) {
      try {
        setIsLoading(true);

        fetchTodoList()
          .then((response) => {
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  }, [date.year, date.month]);

  const toggleIsLogined = () => {
    setIsLogined(!isLogined);
  };

  return (
    <div>
      {isLoading ? (
        <div>로딩 중입니다.</div>
      ) : (
        <div>
          {isLogined ? (
            <div>
              {/* chart TopCenter */}
              <MyChart />

              {/* quotes LeftCenter */}
              <Quotes />

              {/* TodatTodoList RightCenter */}
              <TodayTodoList todoList={todoList[todayDate]} today={todayDate} />

              {/* CalendarNav TopCenter */}
              <CalendarNav
                setTodoModalIsOpen={setTodoModalIsOpen}
                setCardIndex={setCardIndex}
                todoList={todoList}
              />
              {todoModalIsOpen && (
                <MyModal
                  isAnimation={true}
                  setIsOpen={setTodoModalIsOpen}
                  isLogined={isLogined}
                  setIsLogined={setIsLogined}
                  el={
                    <TodoList data={todoList[cardIndex]} day={cardIndex + 1} />
                  }
                />
              )}

              <MonthPicker
                todoYear={todoYear}
                todoMonth={todoMonth}
                setTodoYear={setTodoYear}
                setTodoMonth={setTodoMonth}
              />

              {/* sidemenu */}
              <Toolbar toggleIsLogined={toggleIsLogined} />
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
      )}
    </div>
  );
}

export default Mainpage;
