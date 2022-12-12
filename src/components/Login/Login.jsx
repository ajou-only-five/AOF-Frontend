import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

import { useFriendListContext } from "../../context/friendListContext";
import { useTodoListContext } from "../../context/todoListContext";
import { useUserContext } from "../../context/userContext/index";
import { server_debug } from "../../js/server_url";
import { todoListFormat } from "../../js/todoListFormat";

import "../../styles/Auth.css";

function Login(props) {
  const { user, setUser } = useUserContext();
  const { friendList, setFriendList } = useFriendListContext();
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();

  const { todoList, setTodoList } = useTodoListContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

  }, [user, todoList])

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      account: account,
      password: password,
    };

    await axios
      .post(`${server_debug}/auth/login`, body)
      .then(async (v) => {
        alert("로그인에 성공하였습니다.");
        setUser({
          ...v.data,
          lastViewUserId: null,
        });

        setIsLoading(true);
      props.setIsLogined(true);
        props.setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert("아이디 혹은 비밀번호를 확인해주세요");
      });
  };

  return (
    <div className="container">
      <form className="container">
        <label>아이디</label>
        <input
          type="name"
          placeholder="아이디"
          className="login-input"
          onChange={(e) => {
            setAccount(e.currentTarget.value);
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
