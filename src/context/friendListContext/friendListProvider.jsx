import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { server_debug } from "../../js/server_url";
import FriendListContext, { initialFriendListContext } from "./friendListContext.js";
import { useUserContext } from "../userContext";

const FriendListProvider = ({ children }) => {
  const { user, setUser } = useUserContext();
  const [friendList, setFriendList] = useState(initialFriendListContext);

  const value = useMemo(
    () => ({
      friendList,
      setFriendList,
    }),
    [friendList, setFriendList]
  );

  const fetchFriendList = async () => {
    await axios
      .get(`${server_debug}/search/friend`)
      .then(async (res) => {
        if (res.status === 200) {
          let friendList = res.data;
          await axios
            .get(`${server_debug}/search/friendRequested`)
            .then(async (res) => {
              let friendRequestedList = res.data;

              setFriendList([...friendList, ...friendRequestedList]);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (user.userId !== null) {
      fetchFriendList();
    }
  }, [user]);

  return (
    <FriendListContext.Provider value={value}>
      {children}
    </FriendListContext.Provider>
  );
};

export default FriendListProvider;
