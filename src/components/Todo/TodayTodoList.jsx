import React from "react";
import { useTodoListContext } from "../../context/todoListContext";

import "../../styles/Todo.css";
import TodoList from "./TodoList.jsx";

function TodayTodoList(props) {
  const { todoList } = useTodoListContext();

  return (
    <div className="today-todo-container">
      <div className="today-title">Today To-do List</div>
      <TodoList data={todoList[props.today]} />
    </div>
  );
}

export default TodayTodoList;
