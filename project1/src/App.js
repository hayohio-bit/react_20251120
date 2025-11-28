import { useState } from 'react';
import './App.css';
import Viewer from "./component/Viewer";
import Controller from './component/Controller';

function App() {

  const [count, setCount] = useState(1000);

  const handleSetCount = (value) =>{
    setCount(count+ value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count}/>
        </section>
        
        <session>
        <Controller handleSetCount={handleSetCount}/>
        </session>
    </div>
  );
}

export default App;
