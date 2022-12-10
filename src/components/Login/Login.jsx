import axios from "axios";
import React, { useState } from "react";
import { useTodoListContext } from "../../context/todoListContext";
import { useUserContext } from "../../context/userContext/index";
import { server_debug } from "../../js/server_url";
import { todoListFormat } from "../../js/todoListFormat";

import "../../styles/Auth.css";

function Login(props) {
  const { user, setUser } = useUserContext();
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();

  const { todoList, setTodoList } = useTodoListContext();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodoList = async (userId) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentMaxDate = new Date(currentYear, currentMonth, 0).getDate();

    const params = {
      params: {
        userId: userId,
        year: currentYear,
        month: currentMonth,
      },
    };

    await axios
      .get(`${server_debug}/todo/search/todoList`, params)
      .then((res) => {
        if (res.status === 200) {
          setTodoList(Array.from(todoListFormat(res.data, currentMaxDate)));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
        });

        try {
          setIsLoading(true);

          await fetchTodoList(v.data.userId)
            .then((response) => {
              setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
        props.toggleIsLogined();
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
