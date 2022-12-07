import React, { useState } from "react";

const friendList = [
  {
    name: "강동하",
  },
  { name: "장성호" },
];

function Sidebar(props) {
  const [viewFollowing, setViewFollowing] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div className={props.sidebar ? "sidebar sidebar--open" : "sidebar"}>
      {!props.isLogined ? (
        <li onClick={props.showLoginModal}>로그인</li>
      ) : (
        <li onClick={props.toggleIsLogined}>로그아웃</li>
      )}

      <li onClick={() => setViewFollowing(!viewFollowing)}>
        {!viewFollowing ? "친구 목록 보기" : "친구 목록 닫기"}
      </li>

      {viewFollowing && (
        <div>
          <input
            className="friend-search-box"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          {friendList.map((el, i) => {
            return (
              <div
                key={i}
                className="friend-box"
                onClick={() => {
                  console.log(el.name);
                }}
              >
                {el.name}
              </div>
            );
          })}
        </div>
      )}
      <li onClick={() => setViewFollowing(!viewFollowing)}>
        {!viewFollowing ? "친구 요청 보기" : "친구 목록 닫기"}
      </li>
    </div>
  );
}

export default Sidebar;
