import { useMemo, useState } from "react";
import TodoListContext, { initialTodoListContext } from "./todoListContext.js";
import { server_debug } from "../../js/server_url";
import { todoListFormat } from "../../js/todoListFormat";
import axios from "axios";

const TodoListProvider = ({ children }) => {
  const [todoList, setTodoList] = useState(initialTodoListContext);

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

    if (lastViewUserId === null) {
      const params = {
        params: {
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
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListProvider;
