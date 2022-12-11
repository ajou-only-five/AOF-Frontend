import axios from "axios";
import React, { useState } from "react";
import { useFriendListContext } from "../../context/friendListContext";
import { server_debug } from "../../js/server_url";

const SearchListview = ({
  initialApiUri: apiUri,
  userId,
  relation,
  titleWhenShow,
  titleWhenUnShow,
}) => {
  const { friendList, setFriendList } = useFriendListContext();
  const [isShowing, setIsShowing] = useState(false);
  const [search, setSearch] = useState("");
  const [searchNotFriendList, setSearchNotFriendList] = useState([]);

  const showList = () => {
    let dataList = null;

    switch (relation) {
      case 0:
        dataList = friendList.filter((element) => element.RELATION === relation);
        break;
      case 1:
        break;
      case 2:
        dataList = friendList.filter((element) => element.RELATION === relation);
        break;
      case 3:
        break;
      default:
        dataList = [...searchNotFriendList];
        break;
    }

    return dataList;
  }

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
          <button
            onClick={(event) =>
              deleteFriendRequest(event, targetUserId)
            }
          >
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

  const createFriend = (event, targetUserId) => {
    event.preventDefault();

    console.log(userId);

    const body = {
      userId: userId,
      followerId: targetUserId,
    };

    axios
      .post(`${server_debug}/follow`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = friendList.findIndex((friend) => friend.ID === targetUserId);

          let temp = Array.from(friendList);
          temp[index].RELATION = 0;
          setFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriend = (event, targetUserId) => {
    event.preventDefault();

    const body = {
      data : {userId: userId,
      friendId: targetUserId,
      }
    };

    axios
      .delete(`${server_debug}/follow`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = friendList.findIndex((friend) => friend.ID === targetUserId);

          let temp = Array.from(friendList);
          temp.splice(index, 1);
          setFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriendRequested = (event, targetUserId) => {
    event.preventDefault();

    const body = {
      data: {
        requesterId: targetUserId,
        userId: userId,
      }
    };

    axios
      .delete(`${server_debug}/followRequest/requested`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = friendList.findIndex((friend) => friend.ID === targetUserId);

          let temp = Array.from(friendList);
          temp.splice(index, 1);
          setFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createFriendRequest = (event, targetUserId) => {
    event.preventDefault();

    const body = {
      userId: userId,
      requesteeId: targetUserId,
    };

    console.log(body);

    axios
      .post(`${server_debug}/followRequest`, body)
      .then((res) => {
        let index = searchNotFriendList.findIndex((user) => user.ID === targetUserId);

        let temp = Array.from(searchNotFriendList);
        temp[index].RELATION = 1;
        setSearchNotFriendList([...temp]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriendRequest = (event, targetUserId) => {
    event.preventDefault();

    const body = {
      data: {
        userId: userId,
        requesteeId: targetUserId
      }
    };

    axios
      .delete(`${server_debug}/followRequest/request`, body)
      .then((res) => {
        if (res.status === 200) {
          let index = searchNotFriendList.findIndex((user) => user.ID === targetUserId);

          let temp = Array.from(searchNotFriendList);
          temp[index].RELATION = 3;
          setSearchNotFriendList([...temp]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchNotFriendByNickname = (event) => {
    event.preventDefault();
    const params = {
      params: {
        userId: userId,
        nickname: search,
      },
    };

    axios
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
          {
            showList()?.map((el, i) => {
              console.log(el);
              return (
                <div
                  key={i}
                  className="friend-box"
                  onClick={() => {
                    console.log(el.NICKNAME);
                  }}
                >
                  <div>{el.NICKNAME}</div>
                  {createButtonByRelation(el.RELATION, el.ID)}
                  <div></div>
                </div>
              );
            })
          }
        </div>
      )}
    </div>
  );
};

export default SearchListview;
