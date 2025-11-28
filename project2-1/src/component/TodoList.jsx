import React, { useState } from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";

// Props를 구조 분해 할당
const TodoList = ({ todo, onUpdate, onDelete }) => {

    // search 라는 이름으로 State 생성
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === ""
        ? todo
        : todo.filter((it) =>
            it.content.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <input 
            value={search}
            onChange={onChangeSearch}
            className="searchbar"
            placeholder="검색어를 입력하세요"
            />
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} 
                    onUpdate={onUpdate} 
                    onDelete={onDelete} 
                    />
                ))}
        </div>
    </div>
    );
};


export default TodoList;



/* ① <div>{it.content}</div>
map(반복) 메서드를 이용해 배열 todo의 모든 요소를 순차적으로 순회하며
HTML로 변환. 식의 결과값은 배열 todo에 저장된 모든 할 일을
<div> 태그로 감싼 것과 동일함 */
/* ② <TodoItem {...it} />
map 메서드의 콜백 함수가 TodoItem 컴포넌트 반환
TodoItem 컴포넌트에 현재 순회 중인 배열 요소 it의 모든 프로퍼티를
스프레드 연산자(...)를 이용해 Props로 전달함
배열 todo에는 할 일 아이템 객체가 저장되어 있으므로
결과적으로 TodoItem 컴포넌트에는 이 객체 각각의 프로퍼티가 Props로 전달됨
 */
/* ③ <TodoItem key={it.id} {...it} />
리스트와 각 컴포넌트에 key로 할 일 아이템의 id를 전달 */