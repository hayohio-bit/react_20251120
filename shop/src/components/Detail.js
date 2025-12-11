import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Nav } from 'react-bootstrap';

function Detail({ fruit, veggie, onAddToCart }) {
    const { type, id } = useParams();         // URL에서 /detail/:id 의 id 가져오기
    const numericId = Number(id);       // URL 파라미터는 문자열이므로 문자열 → 숫자로 캐스팅
    const [tap, setTap] = useState(0);
    
    // 1) type에 따라 어떤 배열에서 찾을지 결정
    const sourceArray =
        type === "fruit" ? fruit :
        type === "veggie" ? veggie :
        null;

    // 2) type이 이상하거나, 배열이 비어있으면 방어
    if (!sourceArray) {
        return <div className="container mt-5">잘못된 접근입니다.</div>;
    }

    // 3) id값을 기준으로 해당 상품 찾기
    const item = sourceArray.find((f) => f.id === numericId);

    // 4) 잘못된 id로 들어왔을 때 방어 로직
    if (!item) {
        return <div className="container mt-5">존재하지 않는 상품입니다.</div>;
    }

const { id: itemId, imgUrl, title, content, price, weight, rating, reviews } = item;

    return (
        <div className="container">
            <div className="row">
                {/* 이미지 영역 */}
                <div className="col-md-6">
                <img
                src={process.env.PUBLIC_URL+"/"+imgUrl}
                style={{ width: "100%", maxWidth: "400px", height: "auto" }}
                alt={title}
                />
                </div>

                {/* 텍스트 영역 */}
                <div className="col-md-6">
                <h5 className="pt-5">{title}</h5>
                <p>{content}</p>
                {weight && <p>{weight}</p>}

                {rating && (
                    <p style={{ margin: "5px 0" }}>
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)} ({rating}.0) · 리뷰 {reviews}개
                    </p>
                )}

                <p>{price.toLocaleString()}원</p>

                <button
                className="btn btn-primary"
                onClick={() => onAddToCart(item, type)}
                >
                장바구니 담기
                </button>

                <Link to="/cart">
                    <Button variant="outline-success">주문상품 확인하기</Button>
                </Link>
                </div>
            </div>

                <Nav
                variant="tabs"
                defaultActiveKey="link0"
                style={{ marginTop: "50px" }}
                >
                <Nav.Item>
                <Nav.Link onClick={() => setTap(0)} eventKey="link0">
                    버튼0
                </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={() => setTap(1)} eventKey="link1">
                    버튼1
                </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={() => setTap(2)} eventKey="link2">
                    버튼2
                </Nav.Link>
                </Nav.Item>
                </Nav>

                <TabContent tap={tap} />
                </div>
    );
}

                function TabContent({ tap }) {
                    const [fade, setFade] = useState("");

                    useEffect(() => {
                        const timer = setTimeout(() => setFade("end"), 500);
                        return () => {
                        clearTimeout(timer);
                        setFade("");
                        };
                    }, [tap]);

                    return (
                        <div className={"start " + fade}>
                        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
                        </div>
                    );
                    }

export default Detail;