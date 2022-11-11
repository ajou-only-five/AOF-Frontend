import React from "react";
import TodoBlock from "./TodoBlock";

function TodoList(props) {
  const [todoData] = React.useState(props.data);
  return (
    <div className="todo-title-list">
      {todoData.map((el) => {
        return (
          <div>
            <div style={{ color: el.color }} className="todo-title">
              {el.title}
            </div>
            <div className="todo-list">
              {el.todoList.map((el) => {
                return <TodoBlock el={el} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
