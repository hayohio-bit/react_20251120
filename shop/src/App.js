import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Nav} from 'react-bootstrap'
import { useState } from 'react';
import Products from './components/Products';
import { Route, Routes, useNavigate } from "react-router-dom";
import Detail from './components/Detail';
import NotFound from './components/NotFound';
import About from './components/About';
import Location from './components/Location';
import Member from './components/Member';
import Title from './components/Title';
import Title2 from './components/Title2';
import ComVeggie from './components/ComVeggie';
import veggieData from './db/veggie';
import Cart from './components/Cart';
import { useEffect } from 'react';
import axios from 'axios';
//import data from './db/fruit';

function App() {

  const [fruit, setFruit] = useState([]);
  const [veggie, setVeggie] = useState(veggieData);
  const [cart, setCart] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [veggieCount, setVeggieCount] = useState(1);
  const navigate = useNavigate();

  // useEffect로 마운트 시 과일데이터 fetch
  useEffect(() => {
    const fetchFruit = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');

    const fruitData = response.data.map((item) => ({
      id: item.id,
      title: `과일 ${item.id}`,
      imgUrl: `img/fruit${item.id}.jpg`,
      content: item.body.substring(0,30) + '...',
      price: 5000 + (item.id * 1000),
      weight: '1kg',
    }));

    setFruit(fruitData);
    setError(null);
    } catch (err) {
    console.error('데이터 로드 실패:', err);
    setError('과일 데이터를 불러올 수 없습니다.');
    setFruit([]);
    } finally {
    setLoading(false);
  }
};

fetchFruit();
}, []);


const handleLoadMoreVeggie = async() => {
  try {
    if(veggieCount === 1) {
      const result = await axios.get('https://sinaboro.github.io/react_data/veggie2.json');
      setVeggie([...veggie, ...result.data]);
      setVeggieCount(2);
    } else if (veggieCount === 2) {
      const result = await axios.get('https://sinaboro.github.io/react_data/veggie3.json');
      setVeggie([...veggie, ...result.data]);
      setVeggieCount(3);
    } else if (veggieCount === 3 ) {
      alert('더이상 상품이 없습니다.');
    }
  } catch (err) {
    console.error('데이터 로드 실패:', err);
    alert('데이터를 불러올 수 없습니다.');
  }
};

  const sortByName = () => {
    const sortedFruit = [...fruit].sort((a, b) =>
      a.title > b.title ? 1:-1);
    setFruit(sortedFruit);
  };

  const sortByPriceLowToHigh = () => {
    const sortedFruit = [...fruit].sort((a, b) => a.price - b.price);
    setFruit(sortedFruit);
  };

  const sortByPriceHighToLow = () => {
    const sortedFruit = [...fruit].sort((a, b) => b.price - a.price);
    setFruit(sortedFruit);
  };



  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer'}}>
            과일농장
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>홈으로</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/fruit/1')}}>상세페이지</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>장바구니</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>회사소개</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
      {/* 목록 페이지 */}
          <Route 
          path="/" 
          element={
              <div>
                <div className="slider"></div>
                  <Title />
                  <div className="container" style={{marginTop:"30px"}}>
                    <div className="row">
                      {/* 정렬 버튼 영역 */}
                      <div 
                      style={{ display: "flex", 
                      justifyContent: "center", 
                      marginBottom: "2rem" }}>
                        
                        <Button
                          variant="outline-primary"
                          onClick={sortByName}
                          className="me-3"
                        >
                          이름순 정렬
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={sortByPriceLowToHigh}
                          className="me-3"
                        >
                          낮은가격순 정렬
                        </Button>
                        <Button
                          variant="outline-success"
                          onClick={sortByPriceHighToLow}
                        >
                          높은가격순 정렬
                        </Button>
                      </div>

                      {/* 로딩 상태 */}
                      {loading && <p style={{ textAlign: 'center', width: '100%' }}>과일 데이터 로딩 중...</p>}
                      
                      {/* 에러 상태 */}
                      {error && <p style={{ textAlign: 'center', width: '100%', color: 'red' }}>{error}</p>}

                      {/* 상품 카드 리스트 */}
                      {!loading && fruit.map((item) => (
                        <Products {...item} key={item.id} />
                      ))}

                      {/* 채소 섹션 */}
                      <div className='container' style={{ marginTop:'70px'}}>
                        <Title2 />
                        <div className='row' style={{ marginTop:'20px'}}>
                          {veggie.map((item) => (
                          <ComVeggie {...item} key={item.id} />
                          ))}
                        </div>

                        <div style={{textAlign:'center', marginTop: '20px'}}>
                        <Button 
                        variant="outline-success" 
                        onClick={handleLoadMoreVeggie}
                        >
                          + 3개 상품 더 보기 
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> } />

          {/* 상세 페이지 */}
          <Route path="/detail/:type/:id" 
          element={
            <Detail 
            fruit={fruit} 
            veggie={veggie} 
            onAddToCart={(item) => setCart([...cart, item])}
            />} 
          />

          {/* 장바구니 */}
          <Route path="/cart" element={<Cart cart={cart} />} />

          {/* 회사소개 + 중첩 라우트 */}
          <Route path="/about" element={<About/>} >
          <Route path="member" element={<Member/>} />
          <Route path="location" element={<Location/>} />
          </Route>

          {/* 404 페이지 */}
          <Route path='*' element={ <NotFound />} />
      </Routes>

    </div>
  );
}


export default App;
