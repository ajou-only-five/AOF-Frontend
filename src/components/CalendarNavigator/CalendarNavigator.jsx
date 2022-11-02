import React from "react";

function CalendarNavigator() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          bottom: "-80%",
          left: "50%",
          transform: "translate(-60%)",
        }}
      >
        <div
          className="container"
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            position: "relative",
          }}
        >
          {[...Array(36)].fill().map((el, i) => {
            return (
              <div
                style={{
                  position: "absolute",
                  width: 110 * 1.2,
                  height: 155 * 1.2,
                  border: "1px solid white",
                  transform: `rotate(${
                    270 + 10 * i
                  }deg) translate(${700}px) rotate(${
                    -270 - 10 * i + 10 * i
                  }deg)`,
                  zIndex: `${Math.abs(18 - i)}`,
                  top: "50%",
                  left: "50%",

                  background: "#123456",
                }}
              >
                item{i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarNavigator;
