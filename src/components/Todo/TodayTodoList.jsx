import React from "react";

import "../../styles/Todo.css";
import TodoList from "./TodoList.jsx";

function TodayTodoList(props) {
  console.log(props.todoList);
  const [todoData] = React.useState(props.todoList);
  return (
    <div className="today-todo-container">
      <div className="today-title">Today To-do List</div>
      <TodoList data={todoData} />
    </div>
  );
}

export default TodayTodoList;
