import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import Products from "./components/Products";
import { Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Location from "./components/Location";
import Member from "./components/Member";
import Title from "./components/Title";
import Title2 from "./components/Title2";
import ComVeggie from "./components/ComVeggie";
import veggieData from "./db/veggie";
import data from "./db/fruit";
import Cart from "./components/Cart";
import axios from "axios";
import Board from "./components/Board";

function App() {
  const [input, setInput] = useState("");
  const [fruit, setFruit] = useState(data);
  const [veggie, setVeggie] = useState(veggieData);
  const [veggieCount, setVeggieCount] = useState(1);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("로컬스토리지 cart 파싱 오류:", e);
      return {};
    }
  });

  const navigate = useNavigate();

  // cart 변경 시 localStorage 저장
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("로컬스토리지 cart 저장 오류:", e);
    }
  }, [cart]);

  // 채소 +3개씩 더보기
  const handleLoadMoreVeggie = async () => {
    try {
      if (veggieCount === 1) {
        const result = await axios.get(
          "https://raw.githubusercontent.com/hayohio-bit/react_20251120/main/shop/public/data/veggie2.json"
        );
        setVeggie([...veggie, ...result.data]);
        setVeggieCount(2);
      } else if (veggieCount === 2) {
        const result = await axios.get(
          "https://raw.githubusercontent.com/hayohio-bit/react_20251120/main/shop/public/data/veggie3.json"
        );
        setVeggie([...veggie, ...result.data]);
        setVeggieCount(3);
      } else if (veggieCount >= 3) {
        alert("더이상 상품이 없습니다.");
      }
    } catch (err) {
      console.error("데이터 로드 실패:", err);
      alert("데이터를 불러올 수 없습니다.");
    }
  };

  // 정렬 함수들
  const sortByName = () => {
    const sortedFruit = [...fruit].sort((a, b) =>
      a.title > b.title ? 1 : -1
    );
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
      {/* 상단 네비게이션 바 */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            과일농장
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>홈으로</Nav.Link>
            <Nav.Link onClick={() => navigate("/detail/fruit/1")}>
              상세페이지
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/cart")}>장바구니</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>회사소개</Nav.Link>
            <Nav.Link onClick={() => { navigate("/board");}}>게시판</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* 홈(목록) 페이지 */}
        <Route
          path="/"
          element={
            <div>
              {/* 슬라이더 */}
              <div
                className="slider"
                style={{
                  backgroundImage: `url(${
                    process.env.PUBLIC_URL + "/img/slider.jpg"
                  })`,
                }}
              ></div>

              <Title />

              {/* 검색 + 정렬 영역 */}
              <div className="container" style={{ marginTop: "30px" }}>
                <div className="row">
                  {/* 검색 인풋 */}
                  <div className="col-md-6" style={{ textAlign: "left" }}>
                    <input
                      placeholder="상품명을 입력하세요"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      style={{
                        padding: "10px",
                        marginLeft: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        width: "250px",
                        marginRight: "10px",
                      }}
                    />
                  </div>

                  {/* 정렬 드롭다운(select) */}
                  <div className="col-md-6" style={{ textAlign: "right" }}>
                    <select
                      onChange={(e) => {
                        if (e.target.value === "low") sortByPriceLowToHigh();
                        if (e.target.value === "high") sortByPriceHighToLow();
                        if (e.target.value === "name") sortByName();
                      }}
                      style={{
                        padding: "10px",
                        marginLeft: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        width: "150px",
                      }}
                    >
                      <option value="">정렬 선택</option>
                      <option value="low">낮은 가격순</option>
                      <option value="high">높은 가격순</option>
                      <option value="name">이름순</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 과일 리스트 (검색 + 정렬 결과) */}
              <div className="container" style={{ marginTop: "30px" }}>
                <div className="row">
                  {fruit
                    .filter((item) =>
                      item.title
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    )
                    .map((item) => (
                      <Products {...item} key={item.id} />
                    ))}
                </div>
              </div>

              {/* 채소 섹션 */}
              <div className="container" style={{ marginTop: "70px" }}>
                <Title2 />
                <div className="row" style={{ marginTop: "20px" }}>
                  {veggie.map((item) => (
                    <ComVeggie {...item} key={item.id} />
                  ))}
                </div>

                <div style={{ textAlign: "center", marginTop: "5px", marginBottom:"50px" }}>
                  <Button
                    variant="outline-success"
                    onClick={handleLoadMoreVeggie}
                  >
                    + 3개 상품 더 보기
                  </Button>
                </div>
              </div>
            </div>
          }
        />

        {/* 상세 페이지 (fruit / veggie 공용) */}
        <Route
          path="/detail/:type/:id"
          element={
            <Detail
              fruit={fruit}
              veggie={veggie}
              onAddToCart={(item, type) => {
                const key = `${type}-${item.id}-${item.title}`;
                  setCart((prevCart) => ({
                    ...prevCart,
                    [key]: prevCart[key]
                      ? {
                          ...prevCart[key],
                          quantity: prevCart[key].quantity + 1,
                        }
                      : { ...item, type, quantity: 1 },
                }));
              }}
            />
          }
        />

        {/* 장바구니 */}
          <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onRemoveItem={(id, title, type) => {
                const key = `${type}-${id}-${title}`;
                setCart((prevCart) => {
                  const newCart = { ...prevCart };
                  delete newCart[key];
                  return newCart;
                });
              }}
              onUpdateQuantity={(id, title, type, quantity) => {
                const key = `${type}-${id}-${title}`;
                if (quantity <= 0) {
                  setCart((prevCart) => {
                    const newCart = { ...prevCart };
                    delete newCart[key];
                    return newCart;
                  });
                } else {
                  setCart((prevCart) => ({
                    ...prevCart,
                    [key]: { ...prevCart[key], quantity },
                  }));
                }
              }}
            />
          }
        />

        {/* 회사소개 + 중첩 라우트 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<Member />} />
          <Route path="location" element={<Location />} />
        </Route>

        {/* 게시판 */}
        <Route path="/board" element={<Board />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
