import "./Body.css";

function Body(){

    const boolA = true;
    const boolB = false;

    return(
        <div className="body">
            <h1>body</h1>
            <h3>{boolA || boolB}</h3>
            <h2>{String(boolA || boolB)}</h2>
        </div>
    );
}

export default Body;
