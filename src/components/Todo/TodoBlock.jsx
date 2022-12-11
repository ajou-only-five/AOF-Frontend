import React from "react";

import TodoContent from "./TodoContent";

function TodoBlock(props) {
  return (
    <div>
      {props.el?.map((el) => {
        return (
          <div key={el.contentId}>
            <TodoContent data={el} isCard={props.isCard} />
          </div>
        );
      })}
    </div>
  );
}

export default TodoBlock;
