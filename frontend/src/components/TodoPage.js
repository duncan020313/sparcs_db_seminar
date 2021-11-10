import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import "./TodoPage.css";

const Counter = () => {
  const [items, setItems] = useState([]);
  const [addInput, setAddInput] = useState("");

  useEffect(() => {
    // 목록 조회 요청 전송
    axios.get(`/api/todo`)
    // 응답이 돌아오면 응답 내용으로 목록을 변경
    .then(response => {
      setItems(response.data);
    });
  }, []);

  const onDeleteClick = (item) => {
    axios.delete(`api/todo/${item._id}`)
    .then(()=>axios.get(`api/todo`))
    .catch((err)=>{
      if(err.response.code === 403){
        alert("로그인을 해주세요")
      } else alert(`오류! ${err}`);
    })
    .then(response => {
      setItems(response.data);
    })
  };

  const onFinishClick = (item) => {
    // 완료 처리 요청 전송
    axios.put(`/api/todo/${item._id}/finish`)
    // 완료 후 목록 조회 요청 전송
    .then(() => axios.get(`/api/todo`))
    // 응답이 돌아오면 응답 내용으로 목록을 변경
    .then(response => {
      setItems(response.data);
    });
  };
  const onAddClick = () => {
    // 추가 요청 전송
    axios.post(`/api/todo`, {
      name: addInput
    })
    // 완료 후 목록 조회 요청 전송
    .then(() => axios.get(`/api/todo`))
    // 응답이 돌아오면 응답 내용으로 목록을 변경
    .then(response => {
      setItems(response.data);
      // 입력란을 비우기
      setAddInput("");
    });
  };

  const todoItemEls = items.map(v => (
    <TodoItem
      key={v.id}
      name={v.name}
      done={v.done}
      onFinishClick={() => onFinishClick(v)}
      onDeleteClick={() => onDeleteClick(v)}
    />
  ));

  return (
    <div className="todo">
      <div className="todo-add-row">
        <input type="text" value={addInput} onChange={v => setAddInput(v.target.value)} />
        <button onClick={() => onAddClick()}>Add</button>
      </div>
      {todoItemEls}
    </div>
  );
}

export default Counter;
