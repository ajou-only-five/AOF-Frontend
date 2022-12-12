import { createContext } from "react";

export const initialDateContext = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
};

const DateContext = createContext(initialDateContext);

export default DateContext;
