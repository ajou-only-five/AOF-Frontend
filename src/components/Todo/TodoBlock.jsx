import axios from "axios";
import React from "react";
import { useTodoListContext } from "../../context/todoListContext";

import check from "../../images/icons/check.png";
import { getDate } from "../../js/dateFormat";
import { server_debug } from "../../js/server_url";

function TodoBlock(props) {
  const { todoList, setTodoList } = useTodoListContext();

  const deleteContent = async (el) => {
    let body = { contentId: el.contentId };
    console.log(el);
    await axios
      .delete(`${server_debug}/todo/item`, { data: body })
      .then((v) => {
        if (v.status === 200) {
          let tmp = Array.from(todoList);

          const contentIndex = tmp[getDate(el.startAt) - 1]
            .find((element) => element.titleId === el.titleId)
            .todoItemList.findIndex((v) => v.contentId === el.contentId);

          if (contentIndex === -1) {
            // error 처리
            return;
          }

          tmp[getDate(el.startAt) - 1]
            .find((element) => element.titleId === el.titleId)
            .todoItemList.splice(contentIndex, 1);

          setTodoList(tmp);
        }
      });
  };

  const toggleCheck = async (el) => {
    let body = {
      contentId: el.contentId,
      content: el.content,
      isChecked: el.isChecked === 0 ? 1 : 0,
      startAt: el.startAt,
      endAt: el.endAt,
    };

    await axios.patch(`${server_debug}/todo/item`, body).then((v) => {
      if (v.status === 200) {
        let tmp = Array.from(todoList);

        tmp[getDate(el.startAt) - 1]
          .find((element) => element.titleId === el.titleId)
          .todoItemList.find(
            (item) => item.contentId === el.contentId
          ).isChecked =
          tmp[getDate(el.startAt) - 1]
            .find((element) => element.titleId === el.titleId)
            .todoItemList.find((item) => item.contentId === el.contentId)
            .isChecked === 0
            ? 1
            : 0;

        setTodoList(tmp);
      }
    });
  };

  return (
    <div>
      {props.el?.map((el) => {
        return (
          <div key={el.contentId} className="todo-block">
            {!props.isCard && (
              <div
                onClick={() => {
                  toggleCheck(el);
                }}
                className={
                  el.isChecked
                    ? "check-circle check-circle-complete"
                    : "check-circle"
                }
              >
                {el.isChecked !== 0 && <img src={check} alt="check" />}
              </div>
            )}
            <div className={el.isChecked ? "todo todo-complete" : "todo"}>
              {el.content}
            </div>
            {!props.isCard && (
              <div
                onClick={() => {
                  deleteContent(el);
                }}
              >
                delete
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TodoBlock;
