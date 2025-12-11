import React from 'react';

    const Title2 = () => {
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
        <h3>채소 TOP 3</h3>
        <p style={subTextStyle}>신선한 제철 채소를 만나보세요.</p>
        </div>
    );
    };

export default Title2;