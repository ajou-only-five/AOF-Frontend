import React from "react";

function MonthPicker(props) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translate(-50%)",

        display: "flex",
        gap: "10px",
      }}
    >
      <div>{"<"}</div>
      <div>
        {props.todoYear}년 {props.todoMonth}월
      </div>
      <div>{">"}</div>
    </div>
  );
}

export default MonthPicker;
