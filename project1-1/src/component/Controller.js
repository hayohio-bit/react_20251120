import React, { useEffect } from 'react';

const Controller = ({handleSetCount}) => {

    useEffect( () => {
        console.log("Controller1");
    },[]);

    const handleClick = () =>{
        handleSetCount(-1);
    }

    const handleClick2 = () =>{
        handleSetCount(-10);
    }

    console.log("Controller2");

    return (
        <div>
            <button onClick={handleClick}>-1</button>
            <button onClick={handleClick2}>-10</button>
            <button onClick={() => {handleSetCount(-100)}}>-100</button>
            <button onClick={() => {handleSetCount(+100)}}>+100</button>
            <button onClick={() => {handleSetCount(+10)}}>+10</button>
            <button onClick={() => handleSetCount(+1)}>+1</button>
        </div>
    );
};

export default Controller;