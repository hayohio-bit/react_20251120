import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Nav} from 'react-bootstrap'
import data from './db/fruit';
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

function App() {

  const [fruit, setFruit] = useState(data);
  const [veggie, setVeggie] = useState(veggieData);
  const navigate = useNavigate();

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
            {/* 상세는 특정 id 필요하므로 데모용으로 1번 상품 연결 */}
            <Nav.Link onClick={()=>{navigate('/detail/furit/1')}}>상세페이지</Nav.Link>
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
                    
                      {/* 상품 카드 리스트 */}
                      {fruit.map((item) => ( 
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
                        <Button variant="outline-success"> + 3개 상품 더 보기 </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> } />

          {/* 상세 페이지 */}
          <Route path="/detail/:type/:id" element={<Detail fruit={fruit} veggie={veggie} />} />

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
