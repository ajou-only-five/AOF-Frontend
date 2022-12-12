import { useMemo, useState } from "react";
import DateContext, { initialDateContext } from "./dateContext.js";

const DateProvider = ({ children }) => {
  const [date, setDate] = useState({ ...initialDateContext });

  const value = useMemo(
    () => ({
      date,
      setDate,
    }),
    [date, setDate]
  );

  console.log(date);

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export default DateProvider;
