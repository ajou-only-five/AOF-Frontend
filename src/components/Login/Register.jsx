import axios from "axios";
import React, { useState, useEffect } from "react";

import "../../styles/Auth.css";

import { server_debug } from "../../js/server_url";

function Register(props) {
  const [account, setAccount] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [isValidAccount, setIsValidAccount] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (isValidAccount && isValidNickname) {
      let body = {
        account: account,
        password: password,
        nickname: nickname,
      };

      await axios.post(`${server_debug}/auth/sign-up`, body).then((v) => {
        if (v.status === 200) {
          alert("회원가입이 완료되었습니다.");
          props.setIsOpen(false);
        }
      });
    } else {
      alert("아이디 혹은 닉네임 중복 확인을 해주세요.");
    }
  };

  useEffect(() => {
    setIsValidAccount(false);
  }, [account]);

  useEffect(() => {
    setIsValidNickname(false);
  }, [nickname]);

  const checkValidAccount = async (e) => {
    e.preventDefault();
    let body = { account: account };

    await axios
      .post(`${server_debug}/valid/account/exists`, body)
      .then((v) => {
        alert("사용가능한 아이디 입니다.");
        setIsValidAccount(true);
      })
      .catch((err) => {
        alert("중복된 아이디가 존재합니다. 다른 아이디를 입력해주세요.");
        setAccount("");
      });
  };

  const checkValidNickname = async (e) => {
    e.preventDefault();
    let body = { nickname: nickname };

    await axios
      .post(`${server_debug}/valid/nickname/exists`, body)
      .then((v) => {
        alert("사용가능한 닉네임 입니다.");
        setIsValidNickname(true);
      })
      .catch((err) => {
        alert("중복된 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.");
        setNickname("");
      });
  };

  return (
    <div className="container">
      <form className="container">
        <label>아이디</label>
        <input
          type="name"
          placeholder="아이디"
          value={account || ""}
          className="auth-input"
          onChange={(e) => {
            setAccount(e.currentTarget.value);
          }}
        />
        <button
          onClick={(e) => {
            checkValidAccount(e);
          }}
        >
          아이디 확인
        </button>
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="auth-input"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <label>비밀번호확인</label>
        <input
          type="password"
          placeholder="비밀번호확인"
          className="auth-input"
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
            checkValidNickname(e);
          }}
        >
          닉네임 중복 체크
        </button>
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
