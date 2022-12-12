import React, { useState, useEffect, useRef } from "react";

import TodoList from "../Todo/TodoList.jsx";
import { target } from "../../js/transform";

import "../../styles/CalendarNav.css";
import useTodoListContext from "../../context/todoListContext/useTodoListContext.js";

function CalendarNav(props) {
  const coverRef = useRef();

  const { todoList } = useTodoListContext();
  // const [todoList, setTodoList] = useState(props.todoList);
  // console.log(todoList);

  useEffect(() => {
    const items = coverRef.current.children;
    const today = new Date();
    const todayDate = today.getDate() - 1;

    // target(items, Math.floor(todoList.length / 2));
    target(items, todayDate);
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
            <TodoList data={el} isCard={true} />
          </div>
        );
      })}
    </div>
  );
}

export default CalendarNav;
