import React from "react";
import { useDateContext } from "../../context/dateContext";

function MonthPicker(props) {
  const { date, setDate } = useDateContext();
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
      <div
        onClick={() => {
          if (date.month === 1) {
            setDate({ year: date.year - 1, month: 12 });
          } else setDate({ ...date, month: date.month - 1 });
        }}
      >
        {"<"}
      </div>
      <div>
        {date.year}년 {date.month}월
      </div>
      <div
        onClick={() => {
          if (date.month === 12) {
            setDate({ year: date.year + 1, month: 1 });
          } else setDate({ ...date, month: date.month + 1 });
        }}
      >
        {">"}
      </div>
    </div>
  );
}

export default MonthPicker;
