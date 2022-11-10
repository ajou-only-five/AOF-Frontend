import React from "react";

function ChartBar(props) {
  console.log(props);
  return (
    <>
      <text x={props.x + props.width / 3.3} y={80} fill={"white"}>
        <tspan>{props.data.name}</tspan>
      </text>

      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        rx={5}
        fill={"#d4d4d4"}
      />
      <text
        x={props.x + props.width / 3.3}
        y={props.y + props.height + 20}
        fill={props.data.rank === 1 ? "yellow" : "white"}
      >
        {props.data.count}
      </text>
    </>
  );
}

export default ChartBar;
