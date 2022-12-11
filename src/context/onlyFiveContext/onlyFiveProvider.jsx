import axios from "axios";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import useFriendListContext from "../friendListContext/useFriendListContext.js";
import useUserContext from "../userContext/useUserContext.js";
import OnlyFiveContext, { initialOnlyFiveContext } from "./onlyFiveContext.js";
import { server_debug } from "../../js/server_url";

const OnlyFiveProvider = ({ children }) => {
  const { user } = useUserContext();
  const { friendList } = useFriendListContext();
  const [onlyFiveList, setOnlyFiveList] = useState(initialOnlyFiveContext);

  const value = useMemo(
    () => ({
      onlyFiveList,
      setOnlyFiveList,
    }),
    [onlyFiveList, setOnlyFiveList]
  );

  useEffect(() => {
    const tryInit = async () => {
      if (user.userId === null || user.userId === undefined) {
        return;
      }

      const params = {
        params: {
          userId: user.userId,
        },
      };

      await axios
        .get(`${server_debug}/onlyFive`, params)
        .then(async (res) => {
          if (res.status === 200) {
            setOnlyFiveList([...res.data]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    tryInit();
  }, [user, friendList]);

  return (
    <OnlyFiveContext.Provider value={value}>
      {children}
    </OnlyFiveContext.Provider>
  );
};

export default OnlyFiveProvider;
