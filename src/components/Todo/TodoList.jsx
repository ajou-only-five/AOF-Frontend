import React from "react";

function TodoList(props) {
  const [data] = React.useState(props.data);
  return <div>TodoList</div>;
}

export default TodoList;
