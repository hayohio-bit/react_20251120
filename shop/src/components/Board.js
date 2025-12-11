    import React, { useState } from "react";
    import { Button, Table, Form, Alert } from "react-bootstrap";

    const FruitBoard = () => {
    // 게시물 목록 상태 관리
    const [boardList, setBoardList] = useState([
        {
        no: "1",
        title: "사과는 언제 배송이 되나요?",
        description: "어제부터 기다렸는데 아직 배송이 안됐어요.",
        viewCount: 1,
        },
        {
        no: "2",
        title: "수박크기가 작아요",
        description:
            "수박이 맛있고 달았습니다. 하지만 수박크기는 많이 작았어요. ",
        viewCount: 2,
        },
        {
        no: "3",
        title: "오렌지 당도가 낮아요",
        description: "당도가 11birx이상은 아닌것같아요.",
        viewCount: 1,
        },
        {
        no: "4",
        title: "딸기향이 이상해요",
        description: "딸기에서 흙냄새가 납니다.",
        viewCount: 1,
        },
    ]);

    // UI 상태들
    const [listOk, setListOk] = useState(true); // 게시글 전체리스트
    const [readOk, setReadOk] = useState(false); // 게시글 읽기
    const [writeOk, setWriteOk] = useState(false); // 게시글 쓰기
    const [editOk, setEditOk] = useState(false); // 게시글 수정
    const [boardInfo, setBoardInfo] = useState({}); // 현재 읽고 있는 게시글의 정보

    // 작성 폼 상태들
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // 수정 상태들 추가
    const [editNo, setEditNo] = useState(null); // 수정할 게시물 번호
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    // 오류 메시지 상태
    const [errorMessage, setErrorMessage] = useState("");

    // 게시글 목록 보기
    const boardListView = () => {
        setReadOk(false);
        setWriteOk(false);
        setEditOk(false);
        setListOk(true);
    };

    // 게시글 읽기
    const boardRead = (no) => {
        setListOk(false);
        setWriteOk(false);
        setEditOk(false);
        setReadOk(true);

        // 조회수 증가
        const updatedList = boardList.map((b) =>
        b.no === no ? { ...b, viewCount: b.viewCount + 1 } : b
        );
        setBoardList(updatedList);

        const selectedBoard = boardList.find((b) => b.no === no);
        setBoardInfo(selectedBoard);
    };

    // 게시글 작성 폼 열기
    const boardWrite = () => {
        setListOk(false);
        setWriteOk(true);
    };

    // 새 글 저장
    const boardSave = () => {
        if (title.trim() === "" || description.trim() === "") {
        setErrorMessage("제목과 내용을 모두 입력해주세요!");
        return;
        }

        const newBoard = {
        no: (boardList.length + 1).toString(),
        title,
        description,
        viewCount: 0,
        };
        setBoardList([...boardList, newBoard]);
        setTitle("");
        setDescription("");
        setErrorMessage("");
        boardListView();
    };

    // 게시글 삭제
    const boardDelete = (no) => {
        const updatedList = boardList.filter((b) => b.no !== no.toString());
        setBoardList(updatedList);
        boardListView();
    };

    // 게시글 수정 폼 열기
    const boardEdit = (no) => {
        setEditOk(true);
        setListOk(false);

        const boardToEdit = boardList.find((b) => b.no === no);
        setEditNo(boardToEdit.no);
        setEditTitle(boardToEdit.title);
        setEditDescription(boardToEdit.description);
    };

    // 수정된 게시글 저장
    const updateBoard = () => {
        const updatedBoardList = boardList.map((b) =>
        b.no === editNo
            ? { ...b, title: editTitle, description: editDescription }
            : b
        );
        setBoardList(updatedBoardList);
        boardListView();
    };

    return (
        <div className="container board-wrap">
        <div className="board-header">
            <h3 className="board-title">과일농장 게시판</h3>
            <span className="board-subtitle">
            배송, 품질, 환불 등 무엇이든 편하게 문의해 주세요.
            </span>
        </div>   

        {/* 목록 보기 */}
        {listOk && (
        <>
            <div className="board-list">
            {boardList
                .slice()
                .reverse()
                .map((board) => (
                <div key={board.no} className="board-item">
                    <div
                    className="board-item-title"
                    onClick={() => boardRead(board.no)}
                    >
                    {board.title}
                    </div>
                    <div
                    className="board-item-desc"
                    onClick={() => boardRead(board.no)}
                    >
                    {board.description}
                    </div>
                    <div className="board-item-meta">
                    <span>No. {board.no} · 조회 {board.viewCount}회</span>
                    <div className="board-item-buttons">
                        <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => boardRead(board.no)}
                        >
                        읽기
                        </Button>
                        <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => boardEdit(board.no)}
                        >
                        수정
                        </Button>
                        <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => boardDelete(board.no)}
                        >
                        삭제
                        </Button>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            <div className="board-list-actions">
            <Button variant="primary" onClick={boardWrite}>
                문의글 작성하기
            </Button>
            </div>
        </>
        )}

        {/* 읽기 화면 */}
        {readOk && (
        <div>
            <h5 className="board-read-title">{boardInfo.title}</h5>
            <hr />
            <p className="board-read-body">{boardInfo.description}</p>
            <div className="board-form-actions">
            <Button variant="secondary" onClick={boardListView}>
                목록으로
            </Button>
            </div>
        </div>
        )}
        {/* 새 글 작성 폼 */}
        {writeOk && (
            <div>
            <h5 className="board-form-title">과일농장에게 문의글 남기기</h5>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form.Group controlId="formName">
                <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="게시글 제목을 입력하세요"
                />
            </Form.Group>
            <Form.Group
                controlId="formDescription"
                style={{ marginTop: "20px" }}
            >
                <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="문의 내용을 작성하세요"
                />
            </Form.Group>

            <div className="board-form-actions">
                <Button
                variant="primary"
                onClick={boardSave}
                style={{ marginRight: "10px" }}
                >
                저장
                </Button>
                <Button variant="secondary" onClick={boardListView}>
                목록으로
                </Button>
            </div>
            </div>
        )}

        {/* 수정 폼 */}
        {editOk && (
            <div>
            <h5 className="board-edit-title">게시물 수정</h5>

            <Form.Group controlId="formEditName">
                <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="수정된 제목"
                />
            </Form.Group>
            <Form.Group
                controlId="formEditDescription"
                style={{ marginTop: "20px" }}
            >
                <Form.Control
                as="textarea"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="수정된 설명"
                />
            </Form.Group>

            <div className="board-form-actions">
                <Button
                variant="outline-success"
                onClick={updateBoard}
                style={{ marginRight: "10px" }}
                >
                수정
                </Button>
                <Button variant="outline-info" onClick={boardListView}>
                목록으로
                </Button>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default FruitBoard;
