import React from 'react';

const Title = () => {
        
    const wrapperStyle = {
        marginTop: '70px',
        textAlign: 'center',
    };

    const subTextStyle = {
        marginTop: '8px',
        color: '#555',
        fontSize: '0.95rem',
    };

    return (
        <div style={wrapperStyle}>
        <h3>햇과일 BEST</h3>
        <p style={subTextStyle}>농부가 추천하는 제철과일을 만나보세요.</p>
        </div>
    );
};

export default Title;