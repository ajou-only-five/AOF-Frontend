import axios from "axios";
import React from "react";
import { useTodayTodoListContext } from "../../context/todayTodoListContext";
import { useTodoListContext } from "../../context/todoListContext";
import { useUserContext } from "../../context/userContext";
import { getDate } from "../../js/dateFormat";
import { server_debug } from "../../js/server_url";

function TodoContent(props) {
  const { user, setUser } = useUserContext();
  const { todoList, setTodoList } = useTodoListContext();
  const { todayTodoList, setTodayTodoList } = useTodayTodoListContext();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [newContent, setNewContent] = React.useState("");
  const today = new Date();

  const todayDate = new Date().getDate();

  const toggleCheck = async (el) => {
    let body = {
      contentId: el.contentId,
      content: el.content,
      isChecked: el.isChecked === 0 ? 1 : 0,
      startAt: el.startAt,
      endAt: el.endAt,
    };

    await axios.patch(`${server_debug}/todo/item`, body).then((v) => {
      console.log(v);
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

      if (props.isToday) {
        let todaytmp = Array.from(todayTodoList);

        todaytmp
          .find((element) => element.titleId === el.titleId)
          .todoItemList.find(
            (item) => item.contentId === el.contentId
          ).isChecked =
          todaytmp
            .find((element) => element.titleId === el.titleId)
            .todoItemList.find((item) => item.contentId === el.contentId)
            .isChecked === 0
            ? 1
            : 0;

        setTodayTodoList(todaytmp);
      }
    });
  };

  const deleteContent = async (el) => {
    let body = { contentId: el.contentId };
    console.log(el);
    await axios
      .delete(`${server_debug}/todo/item`, { data: body })
      .then((v) => {
        console.log(v);
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

        if (props.isToday) {
          let todaytmp = Array.from(todayTodoList);

          const contentIndex = todaytmp
            .find((element) => element.titleId === el.titleId)
            .todoItemList.findIndex((v) => v.contentId === el.contentId);

          todaytmp
            .find((element) => element.titleId === el.titleId)
            .todoItemList.splice(contentIndex, 1);

          setTodayTodoList(todaytmp);
        }
      });
  };

  const updateContent = async (el) => {
    let body = {
      contentId: el.contentId,
      content: newContent || el.content,
      isChecked: el.isChecked,
      startAt: props.isToday ? today : el.startAt,
      endAt: props.isToday ? today : el.endAt,
    };

    await axios.patch(`${server_debug}/todo/item`, body).then((v) => {
      console.log(v);
      if (v.status === 200) {
        let tmp = Array.from(todoList);

        tmp[getDate(el.startAt) - 1]
          .find((element) => element.titleId === el.titleId)
          .todoItemList.find(
            (item) => item.contentId === el.contentId
          ).content = newContent || el.content;

        setTodoList(tmp);
      }
      if (props.isToday) {
        let todaytmp = Array.from(todayTodoList);

        todaytmp
          .find((element) => element.titleId === el.titleId)
          .todoItemList.find(
            (item) => item.contentId === el.contentId
          ).content = newContent || el.content;

        setTodayTodoList(todaytmp);
      }
    });

    setIsUpdate(false);
    setNewContent("");
  };

  return (
    <div className="todo-block">
      <div style={{ display: "flex", gap: 5 }}>
        {!props.isCard && (
          <div onClick={() => {
            if (user.lastViewUserId !== null) {
              return;
            }

            toggleCheck(props.data);
          }}>
            {!props.data.isChecked ? (
              <span className="material-symbols-outlined">
                radio_button_unchecked
              </span>
            ) : (
              <span className="material-symbols-outlined">check_circle</span>
            )}
          </div>
        )}
        {!isUpdate ? (
          <div className={props.data.isChecked ? "todo todo-complete" : "todo"}>
            {props.data.content}
          </div>
        ) : (
          <div>
            <form>
              <input
                placeholder={props.data.content}
                value={newContent || ""}
                onChange={(e) => setNewContent(e.currentTarget.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateContent(props.data);
                }}
              >
                수정
              </button>
            </form>
          </div>
        )}
      </div>
      {
        user.lastViewUserId === null &&
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", gap: 5 }}>
            {!props.isCard && (
              <div
                onClick={() => {
                  setIsUpdate(!isUpdate);
                }}
              >
                {!isUpdate && (
                  <span className="material-symbols-outlined">edit_square</span>
                )}
              </div>
            )}
            {!props.isCard && (
              <div
                onClick={() => {
                  if (window.confirm("해당 todo를 삭제하시겠습니까 ?")) {
                    deleteContent(props.data);
                  }
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default TodoContent;
