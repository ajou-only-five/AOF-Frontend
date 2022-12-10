import axios from "axios";
import React, { useState } from "react";

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

  const createButtonByRelation = (relation) => {
    switch (relation) {
      case 1:
        return <button>친구 요청됨</button>;
      case 2:
        return (
          <div>
            <button>수락</button>
            <button>거절</button>
          </div>
        );
      case 3:
        return <button>친구 추가</button>;

      default:
        return;
    }
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
                {createButtonByRelation(el.RELATION)}
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
