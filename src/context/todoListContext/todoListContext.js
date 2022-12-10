import { createContext } from "react";

export const initialTodoListContext = [];

const TodoListContext = createContext(initialTodoListContext);

export default TodoListContext;
