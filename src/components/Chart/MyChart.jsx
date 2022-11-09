import React, { useState } from "react";

import "../../styles/Chart.css";
import ChartBar from "./ChartBar";

function MyChart(props) {
  const data = [
    { name: "강동하", count: 55 },
    { name: "장성호", count: 40 },
    { name: "이균", count: 32 },
    { name: "나주영", count: 12 },
    { name: "유미리", count: 23 },
  ];

  const [countData, setCountData] = useState(data);

  const maxCount =
    Math.max(...countData.map((el) => el.count)) < 50
      ? 50
      : Math.max(...countData.map((el) => el.count));

  const chartHeight = maxCount + 50;
  const barWidth = 50;
  const barMargin = 30;
  const numofBars = countData.length;
  let width = numofBars * (barWidth + barMargin);

  return (
    <div>
      <svg
        width={width}
        height={chartHeight}
        viewBox={`0 0 ${width} ${props.height}`}
        preserveAspectRatio="xMidYMax meet"
      >
        {data.map((el, idx) => {
          const barHeight = el.count;
          return (
            <ChartBar
              key={el.name}
              x={idx * (barWidth + barMargin)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default MyChart;
