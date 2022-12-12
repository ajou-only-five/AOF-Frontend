import axios from "axios";
import React, { useState } from "react";
import { useTodoListContext } from "../../context/todoListContext";
import { server_debug } from "../../js/server_url";
import { getDate } from "../../js/dateFormat";
import { useDateContext } from "../../context/dateContext";
import { useTodayTodoListContext } from "../../context/todayTodoListContext";
import { useUserContext } from "../../context/userContext";

function TodoTitle(props) {
  const { user} = useUserContext();
  const { todoList, setTodoList } = useTodoListContext();
  const { todayTodoList, setTodayTodoList } = useTodayTodoListContext();
  const { date } = useDateContext();
  const [isCreate, setIsCreate] = useState(false);
  const [newContent, setNewContent] = useState("");

  const createNewContent = async () => {
    let todoAt = new Date(
      date.year,
      date.month - 1,
      props.day === undefined ? new Date().getDate() : props.day
    );

    let body = {
      titleId: props.data.titleId,
      content: newContent,
      startAt: todoAt,
      endAt: todoAt,
    };

    await axios.post(`${server_debug}/todo/item`, body).then((v) => {
      console.log(v);
      if (v.status === 200) {
        let tmp = Array.from(todoList);

        tmp[getDate(todoAt) - 1]
          .find((el) => el.titleId === props.data.titleId)
          .todoItemList.push({
            ...v.data,
            titleId: props.data.titleId,
          });

        setTodoList(tmp);

        setIsCreate(!isCreate);
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
      
      {user.lastViewUserId === null && isCreate && (
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
      {
        user.lastViewUserId === null && <div style={{ display: "flex", flexDirection:"row" }}>
          <div
        onClick={() => {
          setIsCreate(!isCreate);
          console.log(props.day);
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
          if (window.confirm("해당 타이틀을 삭제하시겠습니까 ?"))
            deleteTodoTitle();
        }}
      >
        <span className="material-symbols-outlined">delete</span>
      </div>
      </div>
      }
    </div>
  );
}

export default TodoTitle;
