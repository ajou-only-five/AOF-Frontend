import { createContext } from "react";

export const initialTodayTodoListContext = [];

const TodayTodoListContext = createContext(initialTodayTodoListContext);

export default TodayTodoListContext;
