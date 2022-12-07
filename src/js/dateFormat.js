export function getYear(date) {
  return new Date(date).getYear();
}

export function getMonth(date) {
  return new Date(date).getMonth() + 1;
}

export function getDate(date) {
  return new Date(date).getDate();
}
