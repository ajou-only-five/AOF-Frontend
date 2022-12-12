import { useMemo, useState } from "react";
import UserContext, { initialUserContext } from "./userContext.js";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ ...initialUserContext });

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

