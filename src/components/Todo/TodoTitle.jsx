import axios from "axios";
import React, { useState } from "react";
import { useTodoListContext } from "../../context/todoListContext";
import { server_debug } from "../../js/server_url";
import { getDate } from "../../js/dateFormat";

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
      <div
        onClick={() => {
          deleteTodoTitle();
        }}
      >
        삭제
      </div>
      {isCreate && (
        <form>
          <input onChange={(e) => setNewContent(e.currentTarget.value)} />
          <button
            onClick={(e) => {
              e.preventDefault();
              //   console.log(user.userId);
              createNewContent();
            }}
          >
            등록
          </button>
        </form>
      )}
    </div>
  );
}

export default TodoTitle;
