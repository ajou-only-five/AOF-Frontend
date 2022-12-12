import { createContext } from "react";

export const initialDateContext = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
};

const DateContext = createContext(initialDateContext);

export default DateContext;
