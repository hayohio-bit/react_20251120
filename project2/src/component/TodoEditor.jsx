import React, { useRef, useState } from "react";
import "./TodoEditor.css";


const TodoEditor = ({ onCreate }) => {
    const [content, setContent] = useState("");
    // 할 일 입력 폼을 제어할 객체 inputRef 생성
    const inputRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value)
        
    };

    const onSubmit = () => {
        // 현재 content 값이 빈 문자열이면,
        // inputRef가 current(현재값)로 저장한 요소에 포커스하고 종료
        if(!content){
            inputRef.current.focus();
            return ;
        }
        onCreate(content);
        setContent(""); // 입력 후 초기화
    };

    // 엔터키 핸들러 추가
    const onKeyDown = (e) => {
        if (e.key === 'Enter'){
            onSubmit();
        }
    };

    return (
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기 ✏️</h4>
            <div className="editor_wrapper">
                <input 
                // 할 일 입력 폼의 ref에 inputRef 설정
                ref={inputRef}
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                placeholder="새로운 Todo..." 
                />
                <button onClick={onSubmit}>추가</button>
            </div>
        </div>
    );
};

export default TodoEditor;