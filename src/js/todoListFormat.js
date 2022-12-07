import { getDate } from "./dateFormat";

export function todoListFormat(list, maxDate) {
  let tmp = new Array(maxDate).fill([]);

  // console.log(list);

  list.map((el) => {
    return (tmp[getDate(el.startAt) - 1] = [
      ...tmp[getDate(el.startAt) - 1],
      {
        title: el.title,
        content: el.content,
        isChecked: el.isChecked,
      },
    ]);
  });

  // console.log(tmp);

  return tmp;
}
