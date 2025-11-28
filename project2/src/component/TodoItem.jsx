import "./TodoItem.css";

// Props 구조 분해 할당 {} => { id, content, isDone, createDate + onUpdate + onDelete }
const TodoItem = ({ id, content, isDone, createdDate, onUpdate, onDelete }) => {
    /* 체크박스 틱했을 때 호출할 함수 onChangeCheckbox
        : onUpdate 호출하고 인수로 현재 틱이 발생한 할 일 아이템의 id 전달
    */
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    // <삭제> 클릭시 호출할 함수 onClickDelete 생성
    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
            </div>
        <div className="title_col">{content}</div>
        <div className="date_col">
            {new Date(createdDate).toLocaleDateString()}</div>
        <div className="btn_col">
            <button onClick={onClickDelete}>삭제</button>
            {/* <삭제> 버튼의 onClick 이벤트 핸들러로 함수 onClickDelete 설정 */}
        </div>
    </div>
    );
};

export default TodoItem;