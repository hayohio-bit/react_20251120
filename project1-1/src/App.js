import { useEffect, useRef, useState } from 'react';
import './App.css';
import Viewer from "./component/Viewer";
import Controller from './component/Controller';

function App() {

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    } else {
      console.log("컴포넌트 업데이트!");
    }
  })
  
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleSetCount = (value) =>{
    setCount(count+ value);
  };

  const handleChangeText = (e) =>{
    setText(e.target.value);
  }

/* [] : App.js 컴포넌트가 로딩(mount)될 때 1 회 실행
  [count] : count 값이 변경되면 useEffect 구문 실행
*/
  
  useEffect(()=>{
    console.log("count update : " + count);
  }, [count,text]);

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input value={text} onChange={handleChangeText} />
      </section>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        <Controller handleSetCount={handleSetCount} />
      </section>
    </div>
  );
}

export default App;
