import axios from "axios";
import React from "react";

import check from "../../images/icons/check.png";
import { server_debug } from "../../js/server_url";

function TodoBlock(props) {
  return (
    <div>
      {props.el?.map((el) => {
        return (
          <div key={el.contentId} className="todo-block">
            {!props.isCard && (
              <div
                className={
                  el.isChecked
                    ? "check-circle check-circle-complete"
                    : "check-circle"
                }
              >
                {el.isChecked !== 0 && <img src={check} alt="check" />}
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
