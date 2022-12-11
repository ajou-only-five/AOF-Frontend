import React, { useState } from "react";

import ChartBar from "./ChartBar";

import { sortRank } from "../../js/sort";
import "../../styles/Chart.css";

function MyChart(props) {
  const data = [
    { name: "강현욱", count: 30 },
    { name: "박윤정", count: 40 },
  ];

  const [countData, setCountData] = useState(sortRank(data));

  const maxCount = Math.max(...countData.map((el) => el.count));

  const chartHeight = 400;

  const barMaxHeight = 250;

  const barWidth = 50;
  const barMargin = 10;
  const numofBars = countData.length;
  let width = numofBars * (barWidth + barMargin);

  return (
    <div className="chart-container">
      <svg
        width={width}
        height={chartHeight}
        viewBox={`0 0 ${width} ${chartHeight}`}
        preserveAspectRatio="xMidYMax meet"
      >
        {countData.map((el, idx) => {
          const barHeight = barMaxHeight * (el.count / maxCount);
          return (
            <ChartBar
              key={el.name}
              x={idx * (barWidth + barMargin) + 5}
              y={chartHeight - barHeight - 20}
              width={barWidth}
              height={barHeight}
              chartHeight={chartHeight}
              data={el}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default MyChart;
