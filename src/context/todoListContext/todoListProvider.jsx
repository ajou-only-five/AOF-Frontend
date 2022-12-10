import { useMemo, useState } from "react";
import TodoListContext, { initialTodoListContext } from "./todoListContext.js";

const TodoListProvider = ({ children }) => {
  const [todoList, setTodoList] = useState(initialTodoListContext);

  const value = useMemo(
    () => ({
      todoList,
      setTodoList,
    }),
    [todoList, setTodoList]
  );

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListProvider;
