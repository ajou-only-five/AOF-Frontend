import React, { useState } from "react";
import { useEffect } from "react";
import TodoBlock from "./TodoBlock";
import TodoTitle from "./TodoTitle";

function TodoList(props) {
  return (
    <div className="todo-title-list">
      {props.data?.map((el, i) => {
        
        return (
          <div key={i}>
            {!props.isCard && <TodoTitle data={el} />}
            {el?.todoItemList !== undefined && (
              <div className="todo-list">
                <TodoBlock el={el.todoItemList} isCard={props.isCard} idx={i} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
