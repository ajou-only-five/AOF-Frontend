import axios from "axios";
import React, { useState } from "react";
import { server_debug } from "../../js/server_url";

function CreateTodoItem(props) {
    const [content, setContent] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endtAt, setEndAt] = useState('');

    const createNewItem = () =>{
        props.clicked(true)
    }
    const backward = () => {
        props.clicked(false);
    }
    const Enroll = async (e) => {
        e.preventDefault();
        if(content === '' || startAt === '' || endtAt === '') {
            alert('비어있는 입력이 있습니다.');
        } else {
            await axios
            .post(`${server_debug}/todoItem`, { 
                titleId: 1,
                content: content,
                startAt: startAt,
                endAt: endtAt})
            .then((v) => {
            console.log(v);
            })
            .catch((err) => alert(err));
            props.clicked(false);
            // props.setIsLogined(true);
        }
    }

    return (
        <div>
            <div>
                { !props.state? <button onClick={createNewItem}>새로운 todo 아이템 생성</button> : <button onClick={backward}>뒤로가기</button> }
            </div>
            {props.state ? (
                <div className="container">
                    <form className="container">
                        <label>추가할 일정의 제목</label>
                        <input type='text' placeholder="할 일 1-1" value={content} onChange={(e) => { setContent(e.currentTarget.value) }}></input>
                        <label>일정 시작 시간</label>
                        <input type='text' placeholder="2022-10-25 11:00:00" value={startAt} onChange={(e) => { setStartAt(e.currentTarget.value) }}></input>
                        <label>일정 종료 시간</label>
                        <input type='text' placeholder="2022-10-25 12:00:00" value={endtAt} onChange={(e) => { setEndAt(e.currentTarget.value) }}></input>
                        <button onClick={(e) => Enroll(e)}>등록</button>
                    </form>
                </div>
            ) :<></>}
        </div>
    )
}

export default CreateTodoItem;