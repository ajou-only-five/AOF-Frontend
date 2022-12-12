import { useContext } from "react";
import TodayTodoListContext from "./todayTodoListContext";

const useTodayTodoListContext = () => useContext(TodayTodoListContext);

export default useTodayTodoListContext;
