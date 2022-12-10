import axios from "axios";
import React, { useState } from "react";
import { server_debug } from "../../js/server_url";

const SearchListview = ({
  initialApiUri: apiUri,
  userId,
  relation,
  titleWhenShow,
  titleWhenUnShow,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState([]);

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
              deleteFriendRequest(event, userId, targetUserId)
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
              onClick={(event) => deleteFriendRequest(event, targetUserId)}
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
          setDataList([...res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriend = (event, targetUserId) => {
    event.preventDefault();

    const body = {
      userId: userId,
      friendId: targetUserId,
    };

    axios
      .delete(`${server_debug}/follow`, body)
      .then((res) => {
        if (res.status === 200) {
          setDataList([...res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createFriendRequest = (event, followeeID) => {
    event.preventDefault();

    const body = {
      userId: userId,
      requesteeId: followeeID,
    };

    axios
      .post(`${server_debug}/followRequest`, body)
      .then((res) => {
        if (res.status === 200) {
          setDataList([...res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFriendRequest = (event, followerId, followeeId) => {
    event.preventDefault();

    const body = {
      followerId: followerId,
      followeeId: followeeId,
    };

    axios
      .delete(`${server_debug}/friendRequest`, body)
      .then((res) => {
        if (res.status === 200) {
          setDataList([...res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchListData = () => {
    const params = {
      params: {
        userId: userId,
      },
    };

    axios
      .get(apiUri, params)
      .then((res) => {
        if (res.status === 200) {
          setDataList([...res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchNickname = (event) => {
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
          setDataList([...res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleViewOnClick = () => {
    if (!isShowing && relation !== undefined) {
      fetchListData();
    }
    setIsShowing(!isShowing);
  };

  return (
    <div>
      <li onClick={handleViewOnClick}>
        {isShowing ? titleWhenShow : titleWhenUnShow}
      </li>

      {isShowing && (
        <div>
          <form onSubmit={searchNickname}>
            <input
              className="friend-search-box"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </form>
          {dataList.map((el, i) => {
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
          })}
        </div>
      )}
    </div>
  );
};

export default SearchListview;
