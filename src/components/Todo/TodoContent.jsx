import axios from "axios";
import React from "react";
import { useTodoListContext } from "../../context/todoListContext";
import check from "../../images/icons/check.png";
import { getDate } from "../../js/dateFormat";
import { server_debug } from "../../js/server_url";

function TodoContent(props) {
  const { todoList, setTodoList } = useTodoListContext();
  const [isUpdate, setIsUpdate] = React.useState(false);

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

  const updateContent = async (el) => {
    let body = {
      contentId: el.contentId,
      content: el.content,
      isChecked: el.isChecked,
      startAt: el.startAt,
      endAt: el.endAt,
    };
  };

  return (
    <div className="todo-block">
      <div style={{ display: "flex", gap: 5 }}>
        {!props.isCard && (
          <div
            onClick={() => {
              toggleCheck(props.data);
            }}
            className={
              props.data.isChecked
                ? "check-circle check-circle-complete"
                : "check-circle"
            }
          >
            {props.data.isChecked !== 0 && <img src={check} alt="check" />}
          </div>
        )}
        {!isUpdate ? (
          <div className={props.data.isChecked ? "todo todo-complete" : "todo"}>
            {props.data.content}
          </div>
        ) : (
          <div>
            <form>
              <input value={props.data.content} />
              <button>수정</button>
            </form>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        {!props.isCard && (
          <div
            onClick={() => {
              setIsUpdate(!isUpdate);
            }}
          >
            {!isUpdate ? (
              <span className="material-symbols-outlined">edit_square</span>
            ) : (
              <span className="material-symbols-outlined">check_circle</span>
            )}
          </div>
        )}
        {!props.isCard && (
          <div
            onClick={() => {
              deleteContent(props.data);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoContent;
