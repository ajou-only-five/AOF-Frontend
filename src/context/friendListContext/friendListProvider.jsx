import { useMemo, useState } from "react";
import FriendListContext, { initialFriendListContext } from "./friendListContext.js";

const FriendListProvider = ({ children }) => {
  const [friendList, setFriendList] = useState(initialFriendListContext);

  const value = useMemo(
    () => ({
      friendList,
      setFriendList,
    }),
    [friendList, setFriendList]
  );

  return (
    <FriendListContext.Provider value={value}>
      {children}
    </FriendListContext.Provider>
  );
};

export default FriendListProvider;
