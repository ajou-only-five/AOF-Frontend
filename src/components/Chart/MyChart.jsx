import React, { useState } from "react";

import ChartBar from "./ChartBar";

import { sortRank } from "./sort";
import "../../styles/Chart.css";

function MyChart(props) {
  const data = [
    { name: "이균", count: 30, rank: 3 },
    { name: "장성호", count: 40, rank: 2 },
    { name: "강동하", count: 50, rank: 1 },
    { name: "유미리", count: 1, rank: 5 },
    { name: "나주영", count: 2, rank: 4 },
  ];

  const [countData, setCountData] = useState(sortRank(data));

  // const maxCount =
  //   Math.max(...countData.map((el) => el.count)) < 50
  //     ? 50
  //     : Math.max(...countData.map((el) => el.count));
  const maxCount = Math.max(...countData.map((el) => el.count));

  // const chartHeight = (maxCount + 50) * 3 > 400 ? 400 : (maxCount + 50) * 3;
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
          // const barHeight = el.count * 2.5;
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
