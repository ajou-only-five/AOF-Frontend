export function sortRank(list) {
  list.sort((a, b) => a.count - b.count).reverse();
  let [firstValue, ...lists] = list;
  const answer = [firstValue];

  for (let index in lists) {
    const value = lists[index];
    const key = index % 2 ? "push" : "unshift";
    answer[key](value);
  }

  return answer;
}
