import React from "react";

function Sidebar(props) {
  return (
    <div className={props.sidebar ? "sidebar sidebar--open" : "sidebar"}>
      {!props.isLogined && <li onClick={props.showLoginModal}>로그인</li>}
      {props.isLogined && <li onClick={props.toggleIsLogined}>로그아웃</li>}
      <li>친구 목록 보기</li>
      <li>1</li>
      <li>2</li>
    </div>
  );
}

export default Sidebar;
