import axios from "axios";
import React, { useState } from "react";
import { server_debug } from "../../js/server_url";

import "../../styles/Auth.css";

function Login(props) {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // props.toggleIsLogined();
    // props.setIsOpen(false);

    let body = {
      account: account,
      password: password,
    };

    try {
      await axios
        .post(`${server_debug}/auth/login`, body)
        .then((v) => console.log(v));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form className="container">
        <label>아이디</label>
        <input
          type="name"
          placeholder="아이디"
          className="login-input"
          value={account || ""}
          onChange={(e) => {
            setAccount(e.currentTarget.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input"
          value={password || ""}
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
