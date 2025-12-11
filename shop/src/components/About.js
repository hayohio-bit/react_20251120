import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const About = () => {
    return (
        <div className='container mt-5'>
            <h2>회사소개</h2>
            <p>과일 농장 소개 페이지</p>
        
            {/* 서브 메뉴 */}
            <div style={{marginTop:'20px', marginBottom:'20px'}}>
                <Link to="member" style={{marginRight:"16px"}}>
                멤버소개
                </Link>
                <Link to="location">
                오시는 길
                </Link>
            </div>

            {/* 여기에 자식 라우트(Member, Location)가 끼워져서 렌더링 됨 */}
            <Outlet />
        </div>
    )
}

export default About;