import { useNavigate } from "react-router-dom";

function Products(props) {
    const navigate = useNavigate();
    const { id, title, price, imgUrl, content } = props;

    return (
        <div className="col-md-4" style={{ marginBottom: "50px" }}>
        <div
            className="c1"
            onClick={() => navigate(`/detail/fruit/${id}`)}
            style={{ cursor: "pointer", textAlign: "center" }}
        >
            <img
            src={process.env.PUBLIC_URL+"/"+imgUrl}
            style={{ width: "100%", maxWidth: "250px", height: "auto" }}
            alt={title}
            />
            <h5 style={{ marginTop: "10px" }}>{title}</h5>
            <p>{content}</p>
        <span>{price.toLocaleString()}원</span>
        </div>
        </div>
    );
}

export default Products;
