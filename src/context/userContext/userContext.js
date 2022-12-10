import { createContext } from "react";

export const initialUserContext = {
  userId: null,
  nickname: null,
  profile: null,
  disclosure: null,
  setUser: null,
};

const UserContext = createContext(initialUserContext);

export default UserContext;
