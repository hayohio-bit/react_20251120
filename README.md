
## 1. React란?

React는 Facebook(Meta)에서 개발한 **사용자 인터페이스(UI) 구축을 위한 JavaScript 라이브러리**이다.

### 핵심 특징

- **컴포넌트 기반**: UI를 재사용 가능한 컴포넌트로 분리
- **Virtual DOM**: 실제 DOM 조작을 최소화하여 성능 최적화
- **단방향 데이터 흐름**: 데이터가 부모→자식으로만 흐름
- **선언적 프로그래밍**: 원하는 UI 상태를 선언하면 React가 DOM 업데이트 처리

---

## 2. 개발 환경 설정

### Node.js 설치

- [nodejs.org](https://nodejs.org/)에서 LTS 버전 다운로드
- 설치 확인: `node -v`, `npm -v`

### React 프로젝트 생성

```bash
# Create React App (CRA)
npx create-react-app my-app
cd my-app
npm start

# Vite (더 빠른 빌드 도구)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

```

### 폴더 구조

```
my-app/
├── node_modules/     # 의존성 패키지
├── public/           # 정적 파일
├── src/              # 소스 코드
│   ├── App.js
│   ├── App.css
│   ├── index.js      # 진입점
│   └── index.css
├── package.json      # 프로젝트 설정
└── README.md

```

---

## 3. JSX (JavaScript XML)

JSX는 JavaScript에서 HTML과 유사한 문법을 사용할 수 있게 해주는 문법 확장이다.

### JSX 기본 규칙

```jsx
// 1. 반드시 하나의 부모 요소로 감싸야 함
return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
);

// 2. Fragment 사용 (불필요한 div 방지)
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
);

// 3. JavaScript 표현식은 중괄호 {} 사용
const name = "홍길동";
return <h1>안녕하세요, {name}님!</h1>;

// 4. class 대신 className 사용
return <div className="container">내용</div>;

// 5. 인라인 스타일은 객체로
return <div style={{ color: 'red', fontSize: '20px' }}>내용</div>;

// 6. 모든 태그는 닫혀야 함
return <img src="image.jpg" alt="이미지" />;

```

### 조건부 렌더링

```jsx
// 삼항 연산자
return (
  <div>
    {isLoggedIn ? <UserGreeting /> : <GuestGreeting />}
  </div>
);

// && 연산자 (조건이 true일 때만 렌더링)
return (
  <div>
    {unreadMessages.length > 0 &&
      <span>읽지 않은 메시지: {unreadMessages.length}개</span>
    }
  </div>
);

```

### 리스트 렌더링

```jsx
const items = ['사과', '바나나', '딸기'];

return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// 고유한 key 사용 (권장)
const products = [{id: 1, name: '사과'}, {id: 2, name: '바나나'}];

return (
  <ul>
    {products.map(product => (
      <li key={product.id}>{product.name}</li>
    ))}
  </ul>
);

```

---

## 4. 컴포넌트 (Component)

컴포넌트는 UI를 독립적이고 재사용 가능한 조각으로 나눈 것이다.

### 함수형 컴포넌트 (권장)

```jsx
// 기본 함수형 컴포넌트
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// 화살표 함수
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// Props 받기
function Welcome({ name, age }) {
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      <p>나이: {age}세</p>
    </div>
  );
}

// 컴포넌트 사용
function App() {
  return (
    <div>
      <Welcome name="홍길동" age={25} />
      <Welcome name="김철수" age={30} />
    </div>
  );
}

```

### 클래스형 컴포넌트 (레거시)

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

```

### 컴포넌트 분리 예시

```jsx
// components/Header.jsx
function Header() {
  return (
    <header>
      <h1>내 웹사이트</h1>
      <nav>
        <a href="/">홈</a>
        <a href="/about">소개</a>
      </nav>
    </header>
  );
}
export default Header;

// App.jsx
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <main>메인 콘텐츠</main>
    </div>
  );
}

```

---

## 5. Props & State

### Props (Properties)

Props는 부모 컴포넌트에서 자식 컴포넌트로 전달하는 **읽기 전용** 데이터이다.

```jsx
// Props 기본 사용
function UserCard({ name, email, isAdmin }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{email}</p>
      {isAdmin && <span className="badge">관리자</span>}
    </div>
  );
}

// 기본값 설정
function Button({ text = "클릭", color = "blue" }) {
  return <button style={{ backgroundColor: color }}>{text}</button>;
}

// children props
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// 사용
<Card title="공지사항">
  <p>여기에 내용이 들어갑니다.</p>
  <button>확인</button>
</Card>

```

### State (상태)

State는 컴포넌트 내부에서 관리되는 **변경 가능한** 데이터이다.

```jsx
import { useState } from 'react';

function Counter() {
  // [state값, state변경함수] = useState(초기값)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>리셋</button>
    </div>
  );
}

```

### Props vs State 비교

| 구분 | Props | State |
| --- | --- | --- |
| 데이터 출처 | 부모 컴포넌트 | 컴포넌트 자체 |
| 변경 가능 | ❌ (읽기 전용) | ⭕ (setState로 변경) |
| 역할 | 컴포넌트 구성 | UI 상호작용 관리 |

---

## 6. React Hooks

Hooks는 함수형 컴포넌트에서 state와 라이프사이클 기능을 사용할 수 있게 해주는 함수이다.

### useState - 상태 관리

```jsx
import { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 객체 state
  const [user, setUser] = useState({ name: '', age: 0 });

  // 객체 업데이트 (스프레드 연산자 사용)
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };

  // 배열 state
  const [items, setItems] = useState([]);

  // 배열에 추가 (새 배열 생성 필수!)
  const addItem = (item) => {
    setItems([...items, item]);  // ⭕ 올바른 방법
    // items.push(item);         // ❌ 직접 수정 금지
  };

  return (/* ... */);
}

```

### useEffect - 사이드 이펙트 처리

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // 마운트 시 실행 (빈 의존성 배열)
  useEffect(() => {
    console.log('컴포넌트 마운트');

    // 클린업 함수 (언마운트 시 실행)
    return () => {
      console.log('컴포넌트 언마운트');
    };
  }, []);

  // 특정 값 변경 시 실행
  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, [userId]);  // userId가 변경될 때마다 실행

  // 매 렌더링마다 실행 (의존성 배열 없음)
  useEffect(() => {
    document.title = `사용자: ${user?.name}`;
  });

  return (/* ... */);
}

```

### useRef - DOM 접근 & 값 유지

```jsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 자동 포커스
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}

// 렌더링 없이 값 유지
function Timer() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;  // 렌더링 발생 안함
    console.log(countRef.current);
  };

  return <button onClick={increment}>증가</button>;
}

```

### useMemo & useCallback - 성능 최적화

```jsx
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, onItemClick }) {
  // 계산 결과 메모이제이션
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.price - b.price);
  }, [items]);  // items가 변경될 때만 재계산

  // 함수 메모이제이션
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (/* ... */);
}

```

---

## 7. 이벤트 처리

React에서 이벤트는 camelCase로 작성하며, 함수를 전달한다.

### 기본 이벤트 처리

```jsx
function Button() {
  const handleClick = () => {
    alert('클릭됨!');
  };

  return <button onClick={handleClick}>클릭</button>;
}

// 인라인 함수
function Button() {
  return (
    <button onClick={() => alert('클릭됨!')}>
      클릭
    </button>
  );
}

```

### 이벤트 객체 (e)

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();  // 기본 동작 방지
    console.log('폼 제출');
  };

  const handleChange = (e) => {
    console.log(e.target.value);  // 입력값
    console.log(e.target.name);   // input name 속성
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        onChange={handleChange}
        placeholder="사용자명"
      />
      <button type="submit">제출</button>
    </form>
  );
}

```

### 자주 사용하는 이벤트

| 이벤트 | 설명 |
| --- | --- |
| `onClick` | 클릭 |
| `onChange` | 값 변경 (입력 필드) |
| `onSubmit` | 폼 제출 |
| `onFocus` | 포커스 획득 |
| `onBlur` | 포커스 잃음 |
| `onKeyDown` | 키보드 누름 |
| `onMouseEnter` | 마우스 진입 |
| `onMouseLeave` | 마우스 떠남 |

### 함수에 인수 전달

```jsx
function ItemList() {
  const handleDelete = (id) => {
    console.log(`아이템 ${id} 삭제`);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          {/* 화살표 함수로 감싸서 인수 전달 */}
          <button onClick={() => handleDelete(item.id)}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

```

---

## 8. 조건부 렌더링 패턴

```jsx
function UserGreeting({ user, isLoading, error }) {
  // 1. early return 패턴
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!user) return <div>사용자 없음</div>;

  return <div>안녕하세요, {user.name}님!</div>;
}

// 2. 컴포넌트 분리
function Content({ isLoggedIn }) {
  return isLoggedIn ? <Dashboard /> : <LoginForm />;
}

// 3. 객체 맵핑
const statusMessages = {
  loading: '로딩 중...',
  success: '성공!',
  error: '실패!'
};

function StatusMessage({ status }) {
  return <div>{statusMessages[status]}</div>;
}

```

---

## 9. 폼 다루기

### 제어 컴포넌트

```jsx
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
    </form>
  );
}

```

### 체크박스 & 셀렉트

```jsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'light'
  });

  return (
    <form>
      {/* 체크박스 */}
      <label>
        <input
          type="checkbox"
          checked={settings.notifications}
          onChange={(e) => setSettings({
            ...settings,
            notifications: e.target.checked
          })}
        />
        알림 허용
      </label>

      {/* 셀렉트 */}
      <select
        value={settings.theme}
        onChange={(e) => setSettings({
          ...settings,
          theme: e.target.value
        })}
      >
        <option value="light">라이트</option>
        <option value="dark">다크</option>
      </select>
    </form>
  );
}

```

---

## 10. 컴포넌트 통신

### 부모 → 자식 (Props)

```jsx
function Parent() {
  const [message, setMessage] = useState('안녕!');
  return <Child message={message} />;
}

function Child({ message }) {
  return <p>{message}</p>;
}

```

### 자식 → 부모 (콜백 함수)

```jsx
function Parent() {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return <Child onAddItem={handleAddItem} />;
}

function Child({ onAddItem }) {
  const handleClick = () => {
    onAddItem({ id: Date.now(), name: '새 아이템' });
  };

  return <button onClick={handleClick}>아이템 추가</button>;
}

```

### 형제 컴포넌트 통신 (State 끔어올리기)

```jsx
function Parent() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <ItemList
        onSelect={setSelectedId}
      />
      <ItemDetail
        selectedId={selectedId}
      />
    </div>
  );
}

```

---

## 11. 커스텀 Hooks

로직을 재사용 가능한 함수로 추출한다.

```jsx
// hooks/useInput.js
import { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return { value, onChange, reset };
}

export default useInput;

// 사용
function Form() {
  const email = useInput('');
  const password = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email.value, password.value);
    email.reset();
    password.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...email} placeholder="이메일" />
      <input {...password} type="password" placeholder="비밀번호" />
      <button>제출</button>
    </form>
  );
}

```

### useToggle Hook

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

// 사용
function Modal() {
  const modal = useToggle(false);

  return (
    <>
      <button onClick={modal.toggle}>모달 열기</button>
      {modal.value && (
        <div className="modal">
          <button onClick={modal.setFalse}>닫기</button>
        </div>
      )}
    </>
  );
}

```

---

## 12. 스타일링 방법

### CSS 모듈

```css
/* Button.module.css */
.button {
  padding: 10px 20px;
  border-radius: 8px;
}

.primary {
  background-color: #007bff;
  color: white;
}

```

```jsx
import styles from './Button.module.css';

function Button({ variant = 'primary', children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}

```

### styled-components

```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 8px;

  &:hover {
    opacity: 0.8;
  }
`;

function App() {
  return (
    <>
      <StyledButton primary>기본</StyledButton>
      <StyledButton>보조</StyledButton>
    </>
  );
}

```

---

## 13. 자주 사용하는 패턴

### 로딩 상태 관리

```jsx
function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <ul>
      {data.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

```

### 디바운싱 (Debouncing)

```jsx
import { useState, useEffect } from 'react';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      // API 호출
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="검색..."
    />
  );
}

```

---

## 14. 주의사항 & Best Practices

### ✅ 권장사항

- 컴포넌트 이름은 PascalCase (`UserProfile`, `TodoItem`)
- 파일명과 컴포넌트 이름 일치시키기
- 한 컴포넌트는 한 가지 역할만 (Single Responsibility)
- 컴포넌트 크기는 작게 유지 (200줄 이하 권장)
- Props는 구조분해 할당으로 받기
- 컴포넌트는 순수 함수처럼 작성 (동일 입력, 동일 출력)

### ❌ 피해야 할 것

```jsx
// ❌ State 직접 수정
const [items, setItems] = useState([]);
items.push(newItem);  // ❌

// ⭕ 새 배열/객체 생성
setItems([...items, newItem]);  // ⭕

// ❌ 렌더링 중 State 변경
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // ❌ 무한 루프!
}

// ❌ useEffect 의존성 누락
useEffect(() => {
  fetchUser(userId);
}, []);  // ❌ userId가 의존성에 없음

// ⭕ 올바른 의존성
useEffect(() => {
  fetchUser(userId);
}, [userId]);  // ⭕

```

### key 사용 주의

```jsx
// ❌ index를 key로 사용 (순서가 변하는 리스트에서 문제)
{items.map((item, index) => <li key={index}>{item}</li>)}

// ⭕ 고유 ID 사용
{items.map(item => <li key={item.id}>{item.name}</li>)}

```

---

## 15. 유용한 라이브러리

| 라이브러리 | 용도 |
| --- | --- |
| `react-router-dom` | 페이지 라우팅 |
| `axios` | HTTP 요청 |
| `react-query` / `SWR` | 서버 상태 관리 |
| `zustand` / `recoil` | 전역 상태 관리 |
| `react-hook-form` | 폼 처리 |
| `styled-components` | CSS-in-JS |
| `tailwindcss` | 유틸리티 CSS |

---

## 16. 참고 자료

- [React 공식 문서](https://react.dev/)
- [React 한글 문서](https://ko.react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)