import React from 'react';
import { useNavigate } from 'react-router-dom';

function ComVeggie(props) {
    const navigate = useNavigate();
    const { id, title, content, price, weight, imgUrl } = props;

    return (
        <div className="col-md-4" style={{ marginBottom: "50px", textAlign: "center" }}>
            <div className="c1" 
            onClick={() => navigate(`/detail/veggie/${id}`)} 
            style={{ cursor: "pointer" }}
            >
                <img
                src={process.env.PUBLIC_URL+"/"+imgUrl}
                style={{ width: "100%", maxWidth: "250px", height: "auto" }}
                alt={title}
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