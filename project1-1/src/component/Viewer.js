import { useEffect } from "react";

const Viewer = ({count}) => {

    useEffect( () =>{
        console.log("Viewer");
    },[]);
    
    return (
        <div>
            <div>현재 카운터 : </div>
            <h1>{count}</h1>
            </div>
    );
}

export default Viewer;