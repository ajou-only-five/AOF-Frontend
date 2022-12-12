import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TodoListContext, { initialTodoListContext } from "./todoListContext.js";
import { server_debug } from "../../js/server_url";
import { todoListFormat } from "../../js/todoListFormat";
import useUserContext from "../userContext/useUserContext.js";
import useTodayTodoListContext from "../todayTodoListContext/useTodayTodoListContext.js";
import useDateContext from "../dateContext/useDateContext.js";

const TodoListProvider = ({ children }) => {
  const { user, setUser } = useUserContext();
  const { setTodayTodoList } = useTodayTodoListContext();
  const { date } = useDateContext();
  const [todoList, setTodoList] = useState(initialTodoListContext);
  const [isInitToday, setIsInitToday] = useState(false);
  const [todayLastViewUserId, setTodayLastViewUserId] = useState(-1);

  const value = useMemo(
    () => ({
      todoList,
      setTodoList,
    }),
    [todoList, setTodoList]
  );

  const fetchTodoList = async (lastViewUserId) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentMaxDate = new Date(currentYear, currentMonth, 0).getDate();

    const today = new Date();

    if (lastViewUserId === null) {
      const params = {
        params: {
          year: currentYear,
          month: currentMonth,
        }
      };

      await axios
        .get(`${server_debug}/todo/search/todoList`, params)
        .then((res) => {
          setTodoList(Array.from(todoListFormat(res.data, currentMaxDate)));

          const minDate = new Date(date.year, date.month - 1, 1);
          const maxDate = new Date(date.year, date.month, 0);

          console.log('modalDate', minDate, maxDate, today);

          if (maxDate > today && minDate < today) {
            if (todayLastViewUserId !== lastViewUserId) {
              setTodayTodoList(
                Array.from(
                  todoListFormat(
                    res.data,
                    new Date(
                      today.getFullYear(),
                      today.getMonth() + 1,
                      0
                    ).getDate()
                  )[today.getDate() - 1]
                )
              );
              setTodayLastViewUserId(lastViewUserId);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    const params = {
      params: {
        userId: lastViewUserId,
        year: currentYear,
        month: currentMonth,
      },
    };

    await axios
      .get(`${server_debug}/todo/search/todoList`, params)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTodoList(Array.from(todoListFormat(res.data, currentMaxDate)));

          const minDate = new Date(date.year, date.month - 1, 1);
          const maxDate = new Date(date.year, date.month, 0);

          console.log('modalDate', minDate, maxDate, today);

          if (maxDate > today && minDate < today) {
            if (todayLastViewUserId !== lastViewUserId) {
              setTodayTodoList(
                Array.from(
                  todoListFormat(
                    res.data,
                    new Date(
                      today.getFullYear(),
                      today.getMonth() + 1,
                      0
                    ).getDate()
                  )[today.getDate() - 1]
                )
              );
              setTodayLastViewUserId(lastViewUserId);
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (user.userId !== null) {
      fetchTodoList(user.lastViewUserId);
    }
  }, [user, date.year, date.month]);



  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListProvider;
