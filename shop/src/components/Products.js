import React from 'react';
import { useNavigate } from 'react-router-dom';

const Products = ( { id, title, price, imgUrl, content, weight } ) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className='col-md-4' style={{marginBottom:"50px"}}>
            <div
            className='c1'
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            >
            
            <img 
            src={process.env.PUBLIC_URL+'/'+imgUrl} 
            width="80%" 
            alt={title} 
            />
            <h5 style={{ marginTop:"10px" }}>{title}</h5>
            <p>{content}</p>
            <p>{weight}</p>
            <span>{price.toLocaleString()}원</span>
            </div>
        </div>
    );
};

export default Products;