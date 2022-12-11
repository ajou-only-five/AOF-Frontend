import { getDate } from "./dateFormat";

export function todoListFormat(list, maxDate) {
  let tmp = Array.from({ length: maxDate }, (e) => {
    return list.map((el) => {
      return {
        titleId: el.titleId,
        title: el.title,
        color: el.color,
        todoItemList: [],
      };
    });
  });

  list.map((titleEl, i) =>
    titleEl.todoItemList.map((el) => {
      return (tmp[getDate(el.startAt) - 1][i].todoItemList = [
        ...tmp[getDate(el.startAt) - 1][i].todoItemList,
        { ...el },
      ]);
    })
  );

  return tmp;
}
