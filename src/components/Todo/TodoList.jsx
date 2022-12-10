import React from "react";
import { useTodoListContext } from "../../context/todoListContext";
import TodoBlock from "./TodoBlock";

function TodoList(props) {
  const [todoData] = React.useState(props.data);

  return (
    <div className="todo-title-list">
      {todoData.map((el, i) => {
        console.log(el);
        return (
          <div key={i}>
            {!props.isCard && (
              <div style={{ display: "flex" }}>
                <div style={{ color: el.color }} className="todo-title">
                  {el.title}
                </div>
                <div>추가</div>
              </div>
            )}
            {el.todoItemList !== undefined && (
              <div className="todo-list">
                <TodoBlock el={el.todoItemList} isCard={props.isCard} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
