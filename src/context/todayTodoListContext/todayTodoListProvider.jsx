import { useMemo, useState } from "react";
import TodayTodoListContext, {
  initialTodayTodoListContext,
} from "./todayTodoListContext.js";

const TodayTodoListProvider = ({ children }) => {
  const [todayTodoList, setTodayTodoList] = useState(
    initialTodayTodoListContext
  );

  const value = useMemo(
    () => ({
      todayTodoList,
      setTodayTodoList,
    }),
    [todayTodoList, setTodayTodoList]
  );

  return (
    <TodayTodoListContext.Provider value={value}>
      {children}
    </TodayTodoListContext.Provider>
  );
};

export default TodayTodoListProvider;
