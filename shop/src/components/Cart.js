    import React from "react";
    import { Button } from "react-bootstrap";
    import { useNavigate } from "react-router-dom";

    function Cart({ cart, onRemoveItem, onUpdateQuantity }) {
    const cartItems = Object.values(cart);
    const navigate = useNavigate();

    // 장바구니 비었을 때
    if (cartItems.length === 0) {
        return (
        <div className="container mt-5">
            <h3>장바구니</h3>
            <p>장바구니에 담긴 상품이 없습니다.</p>
        </div>
        );
    }

    // 총 금액
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // 상세 페이지 경로 (과일/채소 모두 지원)
    const getDetailPath = (item) => `/detail/${item.type}/${item.id}`;

    return (
        <div className="container mt-5">
        <h3>장바구니</h3>

        <div style={{ marginTop: "30px" }}>
            {cartItems.map((item, index) => (
            <div
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                padding: "15px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                }}
            >
                {/* 번호 */}
                <div
                style={{
                    width: "40px",
                    textAlign: "center",
                    fontWeight: "600",
                }}
                >
                {index + 1}
                </div>

                {/* 이미지 + 텍스트 전체 클릭 시 상세 이동 */}
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    cursor: "pointer",
                }}
                onClick={() => navigate(getDetailPath(item))}
                >
                <img
                    src={process.env.PUBLIC_URL + "/" + item.imgUrl}
                    alt={item.title}
                    style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #eee",
                    marginRight: "15px",
                    }}
                />

                <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: "600" }}>{item.title}</div>
                    <div
                    style={{
                        color: "#555",
                        fontSize: "0.9rem",
                        marginTop: "3px",
                    }}
                    >
                    {item.weight && `${item.weight} · `}
                    {item.price.toLocaleString()}원
                    </div>
                </div>
                </div>

                {/* 수량 조정 */}
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginRight: "20px",
                }}
                >
                <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                    onUpdateQuantity(
                        item.id,
                        item.title,
                        item.type,
                        item.quantity - 1
                    )
                    }
                >
                    -
                </Button>
                <span
                    style={{
                    minWidth: "30px",
                    textAlign: "center",
                    fontWeight: "bold",
                    }}
                >
                    {item.quantity}
                </span>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                    onUpdateQuantity(
                        item.id,
                        item.title,
                        item.type,
                        item.quantity + 1
                    )
                    }
                >
                    +
                </Button>
                </div>

                {/* 소계 */}
                <div
                style={{
                    minWidth: "120px",
                    textAlign: "right",
                    marginRight: "15px",
                }}
                >
                <p style={{ margin: 0, fontWeight: "bold" }}>
                    {(item.price * item.quantity).toLocaleString()}원
                </p>
                </div>

                {/* 삭제 버튼 */}
                <Button
                variant="danger"
                size="sm"
                onClick={() =>
                    onRemoveItem(item.id, item.title, item.type)
                }
                >
                삭제
                </Button>
            </div>
            ))}
        </div>

        {/* 총 금액 */}
        <div
            style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
            textAlign: "right",
            }}
        >
            <h4>
            총 금액:{" "}
            <span style={{ color: "#dc3545" }}>
                {totalPrice.toLocaleString()}원
            </span>
            </h4>
            <Button
            variant="primary"
            style={{ marginTop: "15px" }}
            onClick={() => {
                alert("현금으로만 결제 가능합니다.\n하영이에게 지불하십쇼.");
            }}
            >
            결제하기
            </Button>
        </div>
        </div>
    );
    }

    export default Cart;
