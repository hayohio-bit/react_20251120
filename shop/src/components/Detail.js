import React from 'react'
import { useParams } from 'react-router-dom'

function Detail({ fruit }) {

    const { id } = useParams();         // URL에서 /detail/:id 의 id 가져오기
    const numericId = Number(id);       // URL 파라미터는 문자열이므로 문자열 → 숫자로 캐스팅
    // id값을 기준으로 해당 상품 찾기 (id가 1,2,3... 이런 구조라고 가정)
    const item = fruit.find((f) => f.id === numericId);

     // 만약 잘못된 id로 들어왔을 때 방어 로직
    if (!item) {
        return <div className='Container mt-5'>존재하지 않는 상품입니다.</div>
    }

    const { imgUrl, title, content, price } = item;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                {/* public/img/fruit1.jpg 이런 구조라면 src={imgUrl} */}
                <img src={'/'+imgUrl} width="100%" alt={title} />
                {/* public 폴더 기준 경로 사용시 아래처럼도 가능 (이미지 위치에 따라 선택) */}
                {/* <img src={process.env.PUBLIC_URL + '/' + imgUrl} ... /> */}
                </div>
                <div className="col-md-6">
                    <h5 className="pt-5">{title}</h5>
                    <p>{content}</p>
                    <p>{price.toLocaleString()}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail
