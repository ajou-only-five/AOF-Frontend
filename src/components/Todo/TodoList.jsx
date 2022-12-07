import React from "react";
import TodoBlock from "./TodoBlock";

function TodoList(props) {
  const [todoData] = React.useState(props.data);
  return (
    <div className="todo-title-list">
      {todoData.map((el, i) => {
        return (
          <div key={i}>
            <div style={{ color: el.color }} className="todo-title">
              {el.title}
            </div>
            <div className="todo-list">
              {/* {el.todoList?.map((el, i) => {
                return (
                  <TodoBlock key={el.content} el={el} isCard={props.isCard} />
                );
              })} */}
              <TodoBlock el={el} isCard={props.isCard} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
