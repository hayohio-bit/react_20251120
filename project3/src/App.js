import './App.css';
import { getEmotionImgById } from './util';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './page/Home';
import New from './page/New';
import Diary from './page/Diary';
import Edit from './page/Edit';
// Routes : 자식인 Route 컴포넌트에서 설정한 경로와 요청 URL을 비교하여
// 정확히 일치하는 컴포넌트를 element 속성에 전달해 렌더링 함
// 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
        <Link to={"/edit"}>Edit</Link>
    </div>
  </div>
  );
}

export default App;
