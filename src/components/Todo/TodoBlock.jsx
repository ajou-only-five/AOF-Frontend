import React from "react";

import check from "../../images/icons/check.png";

function TodoBlock(props) {
  return (
    <div className="todo-block">
      <div
        className={
          props.el.completion
            ? "check-circle check-circle-complete"
            : "check-circle"
        }
      >
        {props.el.completion && <img src={check} alt="check" />}
      </div>
      <div className={props.el.completion ? "todo todo-complete" : "todo"}>
        {props.el.todo}
      </div>
    </div>
  );
}

export default TodoBlock;
