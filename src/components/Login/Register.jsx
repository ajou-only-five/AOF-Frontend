import axios from "axios";
import React, { useState } from "react";

import "../../styles/Auth.css";

import { server_debug } from "../../js/server_url";

function Register(props) {
  const [account, setAccount] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    // e.preventDefault();

    let body = {
      account: account,
      password: password,
      nickname: nickname,
    };

    try {
      await axios.post(`${server_debug}/auth/sign-up`, body).then((v) => {
        if (v.status === 200) {
          alert("회원가입이 완료되었습니다.");
          props.setIsOpen(false);
        }
      });
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
          className="auth-input"
          value={account || ""}
          onChange={(e) => {
            setAccount(e.currentTarget.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="auth-input"
          value={password || ""}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <label>비밀번호확인</label>
        <input
          type="password"
          placeholder="비밀번호확인"
          className="auth-input"
          value={confirmPassword || ""}
          onChange={(e) => {
            setConfirmPassword(e.currentTarget.value);
          }}
        />
        <label>닉네임</label>
        <input
          placeholder="닉네임"
          className="auth-input"
          value={nickname || ""}
          onChange={(e) => {
            setNickname(e.currentTarget.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();

            password === confirmPassword
              ? handleSubmit(e)
              : alert("비밀번호를 확인해주세요");
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Register;
