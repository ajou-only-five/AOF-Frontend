import axios from "axios";
import React, { useState } from "react";
import { server_debug } from "../../js/server_url";
import SearchListview from "./SearchListView";

function Sidebar(props) {
  const searchListViewDataList = [
    {
      id: 0,
      apiUri: `${server_debug}/search/friend`,
      userId: 2,
      relation: 0,
      titleWhenShow: "친구 목록 닫기",
      titleWhenUnShow: "친구 목록 보기",
    },
    {
      id: 1,
      apiUri: `${server_debug}/search/friendRequested`,
      userId: 2,
      relation: 2,
      titleWhenShow: "친구 요청 목록 닫기",
      titleWhenUnShow: "친구 요청 목록 보기",
    },
    {
      id: 2,
      apiUri: `${server_debug}/search/notFriend`,
      userId: 2,
      titleWhenShow: "닫기",
      titleWhenUnShow: "친구 찾기",
    },
  ];

  return (
    <div className={props.sidebar ? "sidebar sidebar--open" : "sidebar"}>
      {!props.isLogined ? (
        <li onClick={props.showLoginModal}>로그인</li>
      ) : (
        <li onClick={props.toggleIsLogined}>로그아웃</li>
      )}

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
    </div>
  );
}

export default Sidebar;
