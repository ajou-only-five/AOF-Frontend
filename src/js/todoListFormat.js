import { getDate } from "./dateFormat";

export function todoListFormat(list, maxDate) {
  let tmp = Array.from({ length: maxDate }, (e) => {
    return list.map((el) => {
      return {
        titleId: el.titleId,
        title: el.title,
        todoItemList: [],
      };
    });
  });

  console.log();

  list.map((titleEl) =>
    titleEl.todoItemList.map((el) => {
      return (tmp[getDate(el.startAt) - 1][titleEl.titleId - 1].todoItemList = [
        ...tmp[getDate(el.startAt) - 1][titleEl.titleId - 1].todoItemList,
        { ...el },
      ]);
    })
  );

  console.log(tmp);

  return tmp;
}
