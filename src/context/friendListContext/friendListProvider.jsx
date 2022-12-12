import { useEffect, useMemo, useState } from "react";
import axios from 'axios';

import FriendListContext, { initialFriendListContext } from "./friendListContext.js";
import { server_debug } from "../../js/server_url";
import useUserContext from "../userContext/useUserContext.js";

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

  useEffect(() => {
    const tryInit = async () => {
      if (user.userId === null || user.userId === undefined) {
        return;
      }

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
              }).catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    tryInit();
  }, [user]);

  return (
    <FriendListContext.Provider value={value}>
      {children}
    </FriendListContext.Provider>
  );
};

export default FriendListProvider;

