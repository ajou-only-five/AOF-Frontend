import axios from "axios";
import React, { useState } from "react";
import { server_debug } from "../../js/server_url";

function CreateTodoItem(props) {
    const [content, setContent] = useState();
    const [startAt, setStartAt] = useState();
    const [endtAt, setEndAt] = useState();

    const createNewItem = () =>{
        props.clicked(true)
    }
    const Enroll = async() => {
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
    }

    return (
        <div>
            <div>
                <button onClick={createNewItem}>새로운 todo 아이템 생성</button>
            </div>
            {props.state ? (
                <div>
                    <form>
                        <label>추가할 일정의 제목</label>
                        <input type='text' value={content} onChange={(e) => { setContent(e.currentTarget.value) }}></input>
                        <label>일정 시작 시간</label>
                        <input type='text' value={startAt} onChange={(e) => { setStartAt(e.currentTarget.value) }}></input>
                        <label>일정 종료 시간</label>
                        <input type='text' value={endtAt} onChange={(e) => { setEndAt(e.currentTarget.value) }}></input>
                        <button onClick={Enroll}>등록</button>
                    </form>
                </div>
            ) :<></>}
        </div>
    )
}

export default CreateTodoItem;