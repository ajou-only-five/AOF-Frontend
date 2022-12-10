import React, { useState } from "react";

import check from "../../images/icons/check.png";

function TodoBlock(props) {
  const [isChecked, setIsChecked] = useState(props.el.isChecked);

  // console.log(props.el);
  const checkButtonClick = () => {
    props.el.isChecked = !isChecked;
    setIsChecked(!isChecked);
  }

  if(!isChecked) {
    return (
      <div className="todo-block">
        {!props.isCard && (
          <div
            className={
              isChecked
                ? "check-circle check-circle-complete"
                : "check-circle"
            }
            onClick={checkButtonClick}
          >
            {isChecked && <img src={check} alt="check"/>}
          </div>
        )}
        <div className={isChecked ? "todo todo-complete" : "todo"}>
          {props.el.content}
        </div>
      </div>
    );
  } else {
    return (
      <div className="todo-block">
        {!props.isCard && (
          <div className={"check-circle check-circle-complete"} onClick={checkButtonClick}>
            <img src={check} alt="check"/>
          </div>
        )}
        <div className={"todo todo-complete"}>
          {props.el.content}
        </div>
      </div>
    );
  }

  // return (
  //   <div className="todo-block">
  //     {!props.isCard && (
  //       <div
  //         className={
  //           props.el.isChecked
  //             ? "check-circle check-circle-complete"
  //             : "check-circle"
  //         }
  //       >
  //         {props.el.isChecked && <img src={check} alt="check"/>}
  //       </div>
  //     )}
  //     <div className={props.el.isChecked ? "todo todo-complete" : "todo"}>
  //       {props.el.content}
  //     </div>
  //   </div>
  // );
}

export default TodoBlock;
