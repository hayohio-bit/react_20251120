import React, { useRef } from 'react';
import "./App.css";
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import TodoItem from './component/TodoItem';
import { useState } from 'react';
import TestComp from './component/TestComp';

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(3);

  /* 데이터 추가 함수 */
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
  };
  setTodo([newItem, ...todo]);
  idRef.current += 1;
};

  /* 데이터 수정 함수 onUpdate : 체크박스에 틱이 발생했을 때 호출 
  ① 틱이 발생한 아이템을 구별하기 위해 매개변수 targetId로 해당 아이템의 id 저장
  ② todo 값 업데이트 위해 setTodo 호출
  ③ map 메서드 이요해 배열 todo에서 id가 targetId와 일치하는 요소 찾으면
      isDone 프로퍼티 값을 토글한 새 배열을 만들어 인수로 전달
  ④ TodoList 컴포넌트에 Props로 함수 onUpdate를 전달함
  */
  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) =>
          it.id === targetId ? { ...it, isDone: !it.isDone } : it
      )
    );
  };

  /* 데이터 삭제 함수 onDelete
  ① 버튼 클릭시 매개변수 targetId에 삭제할 아이템의 id 저장 
  ② 해당 id의 요소를 뺀 새 배열로 todo 업데이트함으로써 대상 아이템 삭제
  ③ 함수 onDelete는 TodoItem에서 <삭제> 버튼을 클릭할 때 호출
  */
  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (
    <div className="App">

      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
} 


export default App;