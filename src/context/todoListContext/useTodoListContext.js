import { useContext } from "react";
import TodoListContext from "./todoListContext";

const useTodoListContext = () => useContext(TodoListContext);

export default useTodoListContext;
