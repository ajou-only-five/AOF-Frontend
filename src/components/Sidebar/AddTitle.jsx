import axios from "axios";
import React, { useState } from "react";
import { useTodoListContext } from "../../context/todoListContext";
import { useUserContext } from "../../context/userContext/index";
import { server_debug } from "../../js/server_url";

function AddTitle() {
  const { user } = useUserContext();
  const { todoList, setTodoList } = useTodoListContext();
  const [title, setTitle] = useState();
  const [titleColor, setTitleColor] = useState("#ffffff");
  const [addTitle, setAddTitle] = useState(false);

  const createNewTitle = async () => {
    let body = {
      title: title,
      color: titleColor,
    };

    console.log(body);

    await axios
      .post(`${server_debug}/todo/title`, body)
      .then((v) => {
        console.log(v);
        if (v.status === 200) {
          let temp = Array.from(todoList);

          for (const todoTitle of todoList) {
            todoTitle.push({
              ...v.data,
              todoItemList: [],
            });
          }

          setTodoList(temp);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <li
        onClick={() => {
          setAddTitle(!addTitle);
        }}
      >
        {!addTitle ? "타이틀 추가" : "타이틀 추가 닫기"}
      </li>
      {addTitle && (
        <div>
          <form>
            <input onChange={(e) => setTitle(e.currentTarget.value)} />
            <input
              type="color"
              defaultValue={"#ffffff"}
              onChange={(e) => setTitleColor(e.currentTarget.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                createNewTitle();
              }}
            >
              타이틀 추가
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTitle;
