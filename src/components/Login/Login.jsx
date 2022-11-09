import React, { useState } from "react";

import "../../styles/Login.css";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.toggleIsLogined();
    props.setIsOpen(false);
  };

  return (
    <div className="container">
      <form className="container">
        <label>이메일</label>
        <input
          type="name"
          placeholder="이메일"
          className="login-input"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />

        <button onClick={(e) => handleSubmit(e)}>로그인</button>
      </form>
    </div>
  );
}

export default Login;
