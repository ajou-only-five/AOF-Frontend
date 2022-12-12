import React from "react";
import { useTodayTodoListContext } from "../../context/todayTodoListContext";
import { useTodoListContext } from "../../context/todoListContext";

import "../../styles/Todo.css";
import TodoList from "./TodoList.jsx";

function TodayTodoComponent(props) {
  const { todayTodoList } = useTodayTodoListContext();
  console.log(todayTodoList);

  return (
    <div className="today-todo-container">
      <div className="today-title">Today To-do List</div>
      <TodoList data={todayTodoList} isToday={true} />
    </div>
  );
}

export default TodayTodoComponent;
