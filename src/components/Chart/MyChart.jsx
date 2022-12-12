import React, { useState } from "react";

import ChartBar from "./ChartBar";

import { sortRank } from "../../js/sort";
import "../../styles/Chart.css";
import { useOnlyFiveContext } from "../../context/onlyFiveContext";
import { useEffect } from "react";

function MyChart(props) {
  const { onlyFiveList } = useOnlyFiveContext();
  const [countData, setCountData] = useState([]);

  const maxCount = Math.max(...countData?.map((el) => el?.ITEM_NUM));
  const chartHeight = 400;
  const barMaxHeight = 250;
  const barWidth = 50;
  const barMargin = 10;
  const numofBars = countData.length;
  let width = numofBars * (barWidth + barMargin);

  useEffect(() => {
    setCountData(sortRank(onlyFiveList));
  }, [onlyFiveList]);

  return countData.length === 0 ? (
    <div>

    </div>
  ) : (
    <div className="chart-container">
      <svg
        width={width}
        height={chartHeight}
        viewBox={`0 0 ${width} ${chartHeight}`}
        preserveAspectRatio="xMidYMax meet"
      >
        {countData?.map((el, idx) => {
          const barHeight = barMaxHeight * (el?.ITEM_NUM / maxCount);

          return (
            <ChartBar
              key={el?.NICKNAME}
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
