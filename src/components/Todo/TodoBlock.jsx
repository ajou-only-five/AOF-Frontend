import React from "react";

import check from "../../images/icons/check.png";

function TodoBlock(props) {
  // console.log(props.el);
  return (
    <div className="todo-block">
      {!props.isCard && (
        <div
          className={
            props.el.isChecked
              ? "check-circle check-circle-complete"
              : "check-circle"
          }
        >
          {props.el.isChecked && <img src={check} alt="check" />}
        </div>
      )}
      <div className={props.el.isChecked ? "todo todo-complete" : "todo"}>
        {props.el.content}
      </div>
    </div>
  );
}

export default TodoBlock;
