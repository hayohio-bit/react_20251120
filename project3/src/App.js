import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { useReducer, useRef, useEffect, useState } from 'react';
import Home from './page/Home';
import New from './page/New';
import Diary from './page/Diary';
import Edit from './page/Edit';
// Routes : 자식인 Route 컴포넌트에서 설정한 경로와 요청 URL을 비교하여
// 정확히 일치하는 컴포넌트를 element 속성에 전달해 렌더링 함
// 
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      return [action.data, ...state];
    }
    default: {
      return state;
    }
    
    case "UPDATE":{
      return state.map((it) => 
        String(it.id) === String(action.data.id) ? {...action.data } : it
    );
    }
    
    case "DELETE":{
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
  }
}

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime(),
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime(),
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime(),
    content: "mock3",
    emotionId: 3,
  },
];

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  }

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
      });
  }

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다...</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
              </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
