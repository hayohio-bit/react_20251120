import React from 'react';
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("sort"));
    console.log(searchParams.get("page"));

    return (
        <div>
            Home 페이지 입니다.
        </div>
    );
};

export default Home;