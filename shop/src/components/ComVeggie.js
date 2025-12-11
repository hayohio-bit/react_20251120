import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComVeggie = ({ id, imgUrl, title, content, price, weight }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/veggie/${id}`);
    };

    return (
        <div className="col-md-4" style={{ marginBottom: '50px' }}>
            <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
                <img
                src={'../'+imgUrl}
                className="card-img-top"
                alt={title}
                style={{ height: '250px', objectFit: 'cover' }}
                />
                <h5 style={{ marginTop: '10px' }}>{title}</h5>
                <p>{content}</p>
                <p>{weight}</p>
                <p>{price.toLocaleString()}원</p>
            </div>
        </div>
    );
};

export default ComVeggie;