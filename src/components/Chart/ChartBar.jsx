import React from "react";

function ChartBar(props) {
  return (
    <>
      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill={"#d4d4d4"}
      />
      <text x={props.x + props.width / 3} y={props.y + props.height}>
        {props.height}
      </text>
    </>
  );
}

export default ChartBar;
