import React from 'react';

const Products = ( { id, title, price, imgUrl, content } ) => {

    return (
        <div className='col-md-4' style={{marginBottom:"50px"}}>
            <img src={imgUrl} width="80%" alt={title} />
            <h5 style={{ marginTop:"10px" }}>{title}</h5>
            <p>{content}</p>
            <span>{price}</span>
            
        </div>
    );
};

export default Products;