import React, { useState, useEffect, useRef } from "react";

import TodoList from "../Todo/TodoList.jsx";
import { target } from "../../js/transform";

import "../../styles/CalendarNav.css";
import useTodoListContext from "../../context/todoListContext/useTodoListContext.js";
import useDateContext from "../../context/dateContext/useDateContext.js";

function CalendarNav(props) {
  const coverRef = useRef();

  const { date } = useDateContext();
  const { todoList } = useTodoListContext();

  useEffect(() => {
    const items = coverRef.current.children;
    const today = new Date();
    const todayDate = today.getDate() - 1;

    today.getMonth() + 1 === date.month
      ? target(items, todayDate)
      : target(items, 0);
  }, [todoList]);

  return (
    <div className="coverflow" ref={coverRef}>
      {todoList?.map((el, i) => {
        return (
          <div
            key={i}
            className="card coverflow-item"
            onClick={() => {
              const items = coverRef.current.children;

              function toggleTodoModal() {
                props.setTodoModalIsOpen(true);
                props.setCardIndex(i);
              }

              items[i].style.zIndex === "999"
                ? toggleTodoModal()
                : target(items, i);
            }}
          >
            <div>{i + 1}일</div>
            <TodoList data={el} isCard={true} day={i + 1} />
          </div>
        );
      })}
    </div>
  );
}

export default CalendarNav;
