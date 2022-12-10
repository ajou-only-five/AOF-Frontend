import React, { useState } from "react";

function TodoTitle(props) {
  const [isCreate, setIsCreate] = useState(false);
  const [newContent, setNewContent] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <div style={{ color: props.data.color }} className="todo-title">
        {props.data.title}
      </div>
      <div
        onClick={() => {
          setIsCreate(!isCreate);
        }}
      >
        추가
      </div>
      {isCreate && <input />}
    </div>
  );
}

export default TodoTitle;
