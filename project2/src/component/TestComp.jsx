import React, { useReducer, useState } from 'react';

function reducer(state, action) {

    switch(action.type){
        case "INCREASE":
            return state + action.data;
        case "DECREASE":
            return state - action.data;
        default:
            return state;
    }
}

const TestComp = () => {

    const [count, dispatch] = useReducer(reducer, 0);
    
/*     const [ count, setCount ] = useState(0);
    const onIncrease = () => setCount(count+1);
    const onDecrease = () => setCount(count-1); */

    const ins = () => dispatch({
        type: "INCREASE",
        data: 1,
    });

    const des = () => dispatch({
        type: "DECREASE",
        data: 1,
    });

    return (
        <div>
            <h4>테스트 컴포넌트</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <button onClick={ ins }>+</button>
            <button onClick={ des }>-</button>
{/*         <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button> */}
        </div>
    );
};

export default TestComp;