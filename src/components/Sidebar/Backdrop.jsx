import React from "react";

function Backdrop(props) {
  return (
    <div
      className={props.sidebar ? "backdrop backdrop--open" : "backdrop"}
      onClick={props.setSidebar}
    ></div>
  );
}

export default Backdrop;
