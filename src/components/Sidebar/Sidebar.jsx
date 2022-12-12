import React, { useState } from "react";
import { useDateContext } from "../../context/dateContext";
import { useUserContext } from "../../context/userContext/index";
import { server_debug } from "../../js/server_url";
import AddTitle from "./AddTitle";
import SearchListview from "./SearchListView";

function Sidebar(props) {
  const { user, setUser } = useUserContext();

  const {date, setDate} = useDateContext();


  const searchListViewDataList = [
    {
      id: 0,
      apiUri: `${server_debug}/search/friend`,
      userId: user.userId,
      relation: 0,
      titleWhenShow: "친구 목록 닫기",
      titleWhenUnShow: "친구 목록 보기",
    },
    {
      id: 1,
      apiUri: `${server_debug}/search/friendRequested`,
      userId: user.userId,
      relation: 2,
      titleWhenShow: "친구 요청 목록 닫기",
      titleWhenUnShow: "친구 요청 목록 보기",
    },
    {
      id: 2,
      apiUri: `${server_debug}/search/notFriend`,
      userId: user.userId,
      titleWhenShow: "닫기",
      titleWhenUnShow: "친구 찾기",
    },
  ];

  return (
    <div className={props.sidebar ? "sidebar sidebar--open" : "sidebar"}>
      <li onClick={props.toggleIsLogined}>로그아웃</li>
      {searchListViewDataList.map((data) => (
        <SearchListview
          key={data.id}
          initialApiUri={data.apiUri}
          userId={data.userId}
          relation={data.relation}
          titleWhenShow={data.titleWhenShow}
          titleWhenUnShow={data.titleWhenUnShow}
        />
      ))}
      <AddTitle />
      {
        user.lastViewUserId !== null &&
        <li onClick={() => {
          let temp = { ...user };
          temp.lastViewUserId = null;

          let today = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
          };
  
          setUser({ ...temp });
          setDate({
            ...today
          })
        }}>돌아가기</li>
      }
    </div>
  );
}

export default Sidebar;
