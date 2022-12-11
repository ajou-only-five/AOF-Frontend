import axios from "axios";
import React, { useState } from "react";
import { useTodoListContext } from "../../context/todoListContext";
import { server_debug } from "../../js/server_url";
import { getDate } from "../../js/dateFormat";

import addBox from "../../images/icons/addBox.png";

function TodoTitle(props) {
  const { todoList, setTodoList } = useTodoListContext();
  const [isCreate, setIsCreate] = useState(false);
  const [newContent, setNewContent] = useState("");

  const createNewContent = async () => {
    let body = {
      titleId: props.data.titleId,
      content: newContent,
      startAt: new Date(),
      endAt: new Date(),
    };

    await axios.post(`${server_debug}/todo/item`, body).then((v) => {
      if (v.status === 200) {
        let tmp = Array.from(todoList);

        tmp[getDate(new Date()) - 1]
          .find((el) => el.titleId === props.data.titleId)
          .todoItemList.push({
            ...v.data,
            titleId: props.data.titleId,
          });

        setTodoList(tmp);
      }
    });
  };

  const deleteTodoTitle = async () => {
    let body = { titleId: props.data.titleId };

    await axios
      .delete(`${server_debug}/todo/title`, { data: body })
      .then((v) => {
        console.log(v);
        if (v.status === 200) {
          let tmp = Array.from(todoList);

          setTodoList(
            tmp.map((item) =>
              item.filter((el) => el.titleId !== props.data.titleId)
            )
          );
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div style={{ display: "flex", gap: 5 }}>
      <div style={{ color: props.data.color }} className="todo-title">
        {props.data.title}
      </div>
      {isCreate && (
        <form>
          <input onChange={(e) => setNewContent(e.currentTarget.value)} />
          <button
            onClick={(e) => {
              e.preventDefault();
              createNewContent();
            }}
          >
            등록
          </button>
        </form>
      )}
      <div
        onClick={() => {
          setIsCreate(!isCreate);
        }}
      >
        {!isCreate ? (
          <span className="material-symbols-outlined">add_circle</span>
        ) : (
          <span className="material-symbols-outlined">cancel</span>
        )}
      </div>
      <div
        onClick={() => {
          deleteTodoTitle();
        }}
      >
        <span className="material-symbols-outlined">delete</span>
      </div>
    </div>
  );
}

export default TodoTitle;
