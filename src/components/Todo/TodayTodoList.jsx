import React from "react";

import todoList from "./todoList.json";
import "../../styles/Todo.css";
import TodoList from "./TodoList.jsx";

function TodayTodoList() {
  const [todoData] = React.useState(todoList);
  return (
    <div className="today-todo-container">
      <div className="today-title">Today To-do List</div>
      <TodoList data={todoData} />
    </div>
  );
}

export default TodayTodoList;
