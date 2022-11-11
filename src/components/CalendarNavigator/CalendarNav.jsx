import React, { useEffect, useRef } from "react";

import { target } from "./transform";

import todoList from "./todoList.json";
import "../../styles/CalendarNav.css";

function CalendarNav() {
  const coverRef = useRef();

  useEffect(() => {
    const items = coverRef.current.children;

    target(items, Math.floor(todoList.length / 2));
  }, []);

  return (
    // <div className="coverflow-container">
    <div className="coverflow" ref={coverRef}>
      {todoList.map((el, i) => {
        return (
          <div
            key={el.day}
            className="card coverflow-item"
            onClick={() => {
              const items = coverRef.current.children;
              target(items, i);
            }}
          >
            Card{i}
          </div>
        );
      })}
    </div>
    // {/* </div> */}
  );
}

export default CalendarNav;
