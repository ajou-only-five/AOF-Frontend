import React from "react";

import todoList from "./todoList.json";
import "../../styles/Todo.css";

function TodayTodoList() {
  const [todoData] = React.useState(todoList);
  return (
    <div className="today-todo-container">
      <div className="today-title">Today To-do List</div>
      <div className="today-todo-list">
        {todoData.map((el) => {
          return (
            <div>
              <div style={{ color: el.color }} className="todo-title">
                {el.title}
              </div>
              <div>
                {el.todoList.map((el) => {
                  return (
                    <div
                      className={
                        el.completion
                          ? "today-todo today-todo-complete"
                          : "today-todo"
                      }
                    >
                      {el.todo}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodayTodoList;
