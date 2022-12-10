import React from "react";

import check from "../../images/icons/check.png";

function TodoBlock(props) {
  return (
    <div>
      {props.el.map((el, i) => {
        return (
          <div className="todo-block">
            {!props.isCard && (
              <div
                className={
                  el.isChecked
                    ? "check-circle check-circle-complete"
                    : "check-circle"
                }
              >
                {el.isChecked && <img src={check} alt="check" />}
              </div>
            )}
            <div className={el.isChecked ? "todo todo-complete" : "todo"}>
              {el.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoBlock;
