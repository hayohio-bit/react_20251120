import React from 'react';

function Cart({ cart }) {
    if (cart.length === 0) {
        return (
        <div className="container mt-5">
            <h3>장바구니</h3>
            <p>장바구니에 담긴 상품이 없습니다.</p>
        </div>
        );
    }

    return (
        <div className="container mt-5">
        <h3>장바구니</h3>
        <ul className="list-group">
            {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
                <span>
                {item.title} {item.weight && `(${item.weight})`}
                </span>
                <span>{item.price.toLocaleString()}원</span>
            </li>
            ))}
        </ul>
        </div>
    );
    }

export default Cart;