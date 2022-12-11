import axios from "axios";
import React, { useState } from "react";
import { useFriendListContext } from "../../context/friendListContext";
import { useOnlyFiveContext } from "../../context/onlyFiveContext";
import { useTodoListContext } from "../../context/todoListContext";
import { server_debug } from "../../js/server_url";
import { todoListFormat } from "../../js/todoListFormat";

const SearchListview = ({
  initialApiUri: apiUri,
  userId,
  relation,
  titleWhenShow,
  titleWhenUnShow,
}) => {
  const { friendList, setFriendList } = useFriendListContext();
  const { setTodoList } = useTodoListContext();
  const { setOnlyFiveList } = useOnlyFiveContext();
  const [isShowing, setIsShowing] = useState(false);
  const [search, setSearch] = useState("");
  const [searchNotFriendList, setSearchNotFriendList] = useState([]);

  const showList = () => {
    let dataList = null;

    switch (relation) {
      case 0:
        dataList = friendList.filter(
          (element) => element.RELATION === relation
        );
        break;
      case 1:
        break;
      case 2:
        dataList = friendList.filter(
          (element) => element.RELATION === relation
        );
        break;
      case 3:
        break;
      default:
        dataList = [...searchNotFriendList];
        break;
    }

    return dataList;
  };

  const createButtonByRelation = (relation, targetUserId) => {
    switch (relation) {
      case 0:
        return (
          <button onClick={(event) => deleteFriend(event, targetUserId)}>
            친구 삭제
          </button>
        );
      case 1:
        return (
          <button onClick={(event) => deleteFriendRequest(event, targetUserId)}>
            요청 취소
          </button>
        );
      case 2:
        return (
          <div>
            <button onClick={(event) => createFriend(event, targetUserId)}>
              수락
            </button>
            <button
              onClick={(event) => deleteFriendRequested(event, targetUserId)}
            >
              거절
            </button>
          </div>
        );
      case 3:
        return (
          <button onClick={(event) => createFriendRequest(event, targetUserId)}>
            친구 추가
          </button>
        );

      default:
        return;
    }
  };

  const createFriend = async (event, targetUserId) => {
    event.preventDefault();

    // console.log(userId);

    const body = {
      userId: userId,
      followerId: targetUserId,
    };

    await axios
      .post(`${server_debug}/follow`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = friendList.findIndex(
            (friend) => friend.ID === targetUserId
          );

          let temp = Array.from(friendList);
          temp[index].RELATION = 0;
          setFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriend = async (event, targetUserId) => {
    event.preventDefault();

    const body = {
      data: { userId: userId, friendId: targetUserId },
    };

    await axios
      .delete(`${server_debug}/follow`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = friendList.findIndex(
            (friend) => friend.ID === targetUserId
          );

          let temp = Array.from(friendList);
          temp.splice(index, 1);
          setFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriendRequested = async (event, targetUserId) => {
    event.preventDefault();

    const body = {
      data: {
        requesterId: targetUserId,
        userId: userId,
      },
    };

    await axios
      .delete(`${server_debug}/followRequest/requested`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = friendList.findIndex(
            (friend) => friend.ID === targetUserId
          );

          let temp = Array.from(friendList);
          temp.splice(index, 1);
          setFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createFriendRequest = async (event, targetUserId) => {
    event.preventDefault();

    const body = {
      userId: userId,
      requesteeId: targetUserId,
    };

    console.log(body);

    await axios
      .post(`${server_debug}/followRequest`, body)
      .then((res) => {
        let index = searchNotFriendList.findIndex(
          (user) => user.ID === targetUserId
        );

        let temp = Array.from(searchNotFriendList);
        temp[index].RELATION = 1;
        setSearchNotFriendList([...temp]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriendRequest = async (event, targetUserId) => {
    event.preventDefault();

    const body = {
      data: {
        userId: userId,
        requesteeId: targetUserId,
      },
    };

    await axios
      .delete(`${server_debug}/followRequest/request`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = searchNotFriendList.findIndex(
            (user) => user.ID === targetUserId
          );

          let temp = Array.from(searchNotFriendList);
          temp[index].RELATION = 3;
          setSearchNotFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchNotFriendByNickname = async (event) => {
    event.preventDefault();
    const params = {
      params: {
        userId: userId,
        nickname: search,
      },
    };

    await axios
      .get(apiUri, params)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setSearchNotFriendList([...res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleViewOnClick = () => {
    setIsShowing(!isShowing);
  };

  const getFriendTodoList = async (userId) => {
    const params = {
      params: {
        userId: userId,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
    };

    await axios
      .get(`${server_debug}/todo/search/todoList`, params)
      .then((v) => {
        console.log(v);
        if (v.status === 200) {
          setTodoList(Array.from(todoListFormat(v.data, 30)));
        }
      })
      .catch((e) => console.log(e));

    await axios
      .get(`${server_debug}/onlyFive`, params)
      .then((v) => {
        console.log(v);
        if (v.status === 200) {
          setOnlyFiveList(v.data);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <li onClick={handleViewOnClick}>
        {isShowing ? titleWhenShow : titleWhenUnShow}
      </li>

      {isShowing && (
        <div>
          <form onSubmit={searchNotFriendByNickname}>
            <input
              className="friend-search-box"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </form>
          {showList()?.map((el, i) => {
            console.log(el);
            return (
              <div
                key={i}
                className="friend-box"
                onClick={() => {
                  console.log(el.NICKNAME);
                  console.log(el.ID);
                  getFriendTodoList(el.ID);
                }}
              >
                <div>{el.NICKNAME}</div>
                {createButtonByRelation(el.RELATION, el.ID)}
                <div></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchListview;
