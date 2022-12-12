import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import useUserContext from "../userContext/useUserContext.js";
import TodoListContext, { initialTodoListContext } from "./todoListContext.js";
import { server_debug } from "../../js/server_url";
import { todoListFormat } from "../../js/todoListFormat";

const TodoListProvider = ({ children }) => {
  const { user } = useUserContext();
  const [todoList, setTodoList] = useState(initialTodoListContext);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentMaxDate = new Date(currentYear, currentMonth, 0).getDate();

  const value = useMemo(
    () => ({
      todoList,
      setTodoList,
    }),
    [todoList, setTodoList]
  );

  useEffect(() => {
    const tryInit = async () => {
      if (user.userId === null || user.userId === undefined) {
        return;
      }

      let params = null;

      if (user.lastViewUserId === null || user.lastViewUserId === undefined) {
        params = {
          params: {
            year: currentYear,
            month: currentMonth
          },
        };

        await axios
        .get(`${server_debug}/todo/search/todoList`, params)
        .then(async (res) => {
          setTodoList(Array.from(todoListFormat(res.data, currentMaxDate)));
        })
        .catch((e) => {
          console.log(e);
        });

        return;
      }

      params = {
        params: {
          userId: user.lastViewUserId,
          year: currentYear,
          month: currentMonth
        },
      }

      await axios
        .get(`${server_debug}/todo/search/todoList`, params)
        .then(async (res) => {
          setTodoList(Array.from(todoListFormat(res.data, currentMaxDate)));
        })
        .catch((e) => {
          console.log(e);
        });
    }

    tryInit();
  }, [user]);

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListProvider;

