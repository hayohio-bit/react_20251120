## 📑 목차

1. [React란?](#1-react란)
2. [개발 환경 설정](#2-개발-환경-설정)
3. [JSX (JavaScript XML)](#3-jsx-javascript-xml)
4. [컴포넌트 (Component)](#4-컴포넌트-component)
5. [Props & State](#5-props--state)
6. [React Hooks](#6-react-hooks)
7. [이벤트 처리](#7-이벤트-처리)
8. [조건부 렌더링 패턴](#8-조건부-렌더링-패턴)
9. [폼 다루기](#9-폼-다루기)
10. [컴포넌트 통신](#10-컴포넌트-통신)
11. [커스텀 Hooks](#11-커스텀-hooks)
12. [Context API & 전역 상태 관리](#12-context-api--전역-상태-관리)
13. [React Router](#13-react-router)
14. [API 통신](#14-api-통신)
15. [스타일링 방법](#15-스타일링-방법)
16. [성능 최적화](#16-성능-최적화)
17. [자주 사용하는 패턴](#17-자주-사용하는-패턴)
18. [에러 처리](#18-에러-처리)
19. [테스팅 기초](#19-테스팅-기초)
20. [주의사항 & Best Practices](#20-주의사항--best-practices)
21. [유용한 라이브러리](#21-유용한-라이브러리)
22. [참고 자료](#22-참고-자료)

---

## 1. React란?

React는 Facebook(Meta)에서 개발한 **사용자 인터페이스(UI) 구축을 위한 JavaScript 라이브러리**이다.

### 핵심 특징

| 특징 | 설명 |
|------|------|
| **컴포넌트 기반** | UI를 재사용 가능한 컴포넌트로 분리하여 개발 |
| **Virtual DOM** | 실제 DOM 조작을 최소화하여 성능 최적화 |
| **단방향 데이터 흐름** | 데이터가 부모→자식으로만 흐름 (예측 가능한 상태 관리) |
| **선언적 프로그래밍** | 원하는 UI 상태를 선언하면 React가 DOM 업데이트 처리 |
| **JSX** | JavaScript 내에서 HTML과 유사한 문법 사용 가능 |
| **풍부한 생태계** | 방대한 라이브러리와 커뮤니티 지원 |

### Virtual DOM 동작 원리

```
1. State/Props 변경 발생
2. 새로운 Virtual DOM 트리 생성
3. 이전 Virtual DOM과 새 Virtual DOM 비교 (Diffing)
4. 변경된 부분만 실제 DOM에 반영 (Reconciliation)
5. 브라우저가 변경된 DOM을 리페인트
```

> **왜 Virtual DOM인가?**
> 실제 DOM 조작은 비용이 크다. Virtual DOM은 메모리 상의 가벼운 JavaScript 객체이므로,
> 비교(diffing) 작업이 빠르고, 최소한의 실제 DOM 업데이트만 수행하여 성능을 높인다.

### React vs 다른 프레임워크

| 구분 | React | Vue | Angular |
|------|-------|-----|---------|
| 유형 | 라이브러리 | 프레임워크 | 프레임워크 |
| 학습 곡선 | 중간 | 낮음 | 높음 |
| 상태 관리 | 외부 라이브러리 선택 | Vuex/Pinia 내장 | RxJS 기반 |
| 렌더링 | Virtual DOM | Virtual DOM | Incremental DOM |
| 언어 | JavaScript/JSX | JavaScript/Template | TypeScript |
| 커뮤니티 | 매우 큼 | 큼 | 큼 |

---

## 2. 개발 환경 설정

### Node.js 설치

- [nodejs.org](https://nodejs.org/)에서 LTS 버전 다운로드
- 설치 확인:

```bash
node -v    # Node.js 버전 확인
npm -v     # npm 버전 확인
npx -v     # npx 버전 확인
```

### React 프로젝트 생성

```bash
# ─────────────────────────────────────────────
# 방법 1: Vite (권장, 더 빠른 빌드 도구)
# ─────────────────────────────────────────────
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# ─────────────────────────────────────────────
# 방법 2: Create React App (CRA)
# ※ 2023년 이후 공식 문서에서 비권장, 유지보수 중단 상태
# ─────────────────────────────────────────────
npx create-react-app my-app
cd my-app
npm start

# ─────────────────────────────────────────────
# 방법 3: Next.js (SSR/SSG 필요 시)
# ─────────────────────────────────────────────
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Vite vs CRA 비교

| 구분 | Vite | CRA |
|------|------|-----|
| 개발 서버 시작 | 매우 빠름 (ESM 기반) | 느림 (Webpack 번들링) |
| HMR (Hot Module Replacement) | 즉시 반영 | 상대적으로 느림 |
| 빌드 속도 | 빠름 (Rollup) | 느림 (Webpack) |
| 설정 커스터마이징 | 쉬움 | eject 필요 |
| 현재 상태 | 활발한 업데이트 | 유지보수 중단 |

### 폴더 구조 (기본)

```
my-app/
├── node_modules/          # 의존성 패키지
├── public/                # 정적 파일 (favicon, index.html 등)
├── src/                   # 소스 코드
│   ├── assets/            # 이미지, 폰트 등 리소스
│   ├── App.jsx            # 루트 컴포넌트
│   ├── App.css            # 루트 스타일
│   ├── main.jsx           # 진입점 (Vite) / index.js (CRA)
│   └── index.css          # 글로벌 스타일
├── .gitignore             # Git 무시 파일
├── package.json           # 프로젝트 설정 및 의존성
├── vite.config.js         # Vite 설정 (Vite 사용 시)
└── README.md
```

### 폴더 구조 (실무 권장)

```
src/
├── api/                   # API 호출 함수
│   └── userApi.js
├── assets/                # 이미지, 폰트 등
│   ├── images/
│   └── fonts/
├── components/            # 재사용 가능한 공통 컴포넌트
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   └── layout/
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── Sidebar.jsx
├── hooks/                 # 커스텀 Hooks
│   ├── useInput.js
│   └── useFetch.js
├── pages/                 # 페이지 컴포넌트
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Profile.jsx
├── context/               # Context API
│   └── AuthContext.jsx
├── utils/                 # 유틸리티 함수
│   ├── formatDate.js
│   └── validation.js
├── styles/                # 글로벌 스타일
│   ├── global.css
│   └── variables.css
├── constants/             # 상수 정의
│   └── routes.js
├── App.jsx
└── main.jsx
```

### 필수 VS Code 확장 프로그램

| 확장 프로그램 | 설명 |
|--------------|------|
| ES7+ React/Redux/React-Native snippets | React 코드 스니펫 |
| Prettier - Code formatter | 코드 자동 포맷팅 |
| ESLint | 코드 품질 검사 |
| Auto Rename Tag | HTML 태그 자동 이름 변경 |
| vscode-styled-components | styled-components 구문 하이라이트 |

---

## 3. JSX (JavaScript XML)

JSX는 JavaScript에서 HTML과 유사한 문법을 사용할 수 있게 해주는 문법 확장이다.
빌드 시 Babel이 `React.createElement()` 호출로 변환한다.

### JSX 변환 과정

```jsx
// 우리가 작성하는 JSX
const element = <h1 className="title">Hello!</h1>;

// Babel이 변환한 결과
const element = React.createElement('h1', { className: 'title' }, 'Hello!');
```

### JSX 기본 규칙

```jsx
// ─────────────────────────────────────────────
// 규칙 1: 반드시 하나의 부모 요소로 감싸야 함
// ─────────────────────────────────────────────
return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
);

// ─────────────────────────────────────────────
// 규칙 2: Fragment 사용 (불필요한 div 방지)
// ─────────────────────────────────────────────
import { Fragment } from 'react';

// 방법 1: Fragment 컴포넌트
return (
  <Fragment>
    <h1>제목</h1>
    <p>내용</p>
  </Fragment>
);

// 방법 2: 단축 문법 (더 자주 사용)
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
);

// ─────────────────────────────────────────────
// 규칙 3: JavaScript 표현식은 중괄호 {} 사용
// ─────────────────────────────────────────────
const name = "홍길동";
const isAdmin = true;

return (
  <div>
    <h1>안녕하세요, {name}님!</h1>
    <p>권한: {isAdmin ? '관리자' : '일반 사용자'}</p>
    <p>계산: {1 + 2 + 3}</p>
    <p>현재 시간: {new Date().toLocaleTimeString()}</p>
  </div>
);

// ─────────────────────────────────────────────
// 규칙 4: HTML 속성명은 camelCase로 작성
// ─────────────────────────────────────────────
return (
  <div>
    {/* class → className */}
    <div className="container">내용</div>

    {/* for → htmlFor */}
    <label htmlFor="username">이름</label>
    <input id="username" />

    {/* tabindex → tabIndex */}
    <button tabIndex={0}>버튼</button>
  </div>
);

// ─────────────────────────────────────────────
// 규칙 5: 인라인 스타일은 객체로 (camelCase)
// ─────────────────────────────────────────────
return (
  <div style={{
    color: 'red',
    fontSize: '20px',           // font-size → fontSize
    backgroundColor: '#f0f0f0', // background-color → backgroundColor
    marginTop: '10px'           // margin-top → marginTop
  }}>
    내용
  </div>
);

// ─────────────────────────────────────────────
// 규칙 6: 모든 태그는 반드시 닫혀야 함
// ─────────────────────────────────────────────
return (
  <div>
    <img src="image.jpg" alt="이미지" />   {/* self-closing */}
    <br />
    <hr />
    <input type="text" />
  </div>
);

// ─────────────────────────────────────────────
// 규칙 7: 주석 작성법
// ─────────────────────────────────────────────
return (
  <div>
    {/* JSX 내부 주석은 이렇게 */}
    <h1>제목</h1>
    {/*
      여러 줄 주석도
      이렇게 가능
    */}
  </div>
);
```

### 조건부 렌더링

```jsx
// ─────────────────────────────────────────────
// 방법 1: 삼항 연산자 (if-else)
// ─────────────────────────────────────────────
return (
  <div>
    {isLoggedIn ? <UserGreeting /> : <GuestGreeting />}
  </div>
);

// ─────────────────────────────────────────────
// 방법 2: && 연산자 (조건이 true일 때만 렌더링)
// ─────────────────────────────────────────────
return (
  <div>
    {unreadMessages.length > 0 &&
      <span>읽지 않은 메시지: {unreadMessages.length}개</span>
    }
  </div>
);

// ⚠️ 주의: 0은 falsy이지만 React에서 렌더링됨
// ❌ count가 0이면 화면에 "0"이 출력됨
{count && <span>카운트: {count}</span>}

// ⭕ 명시적으로 boolean 변환
{count > 0 && <span>카운트: {count}</span>}

// ─────────────────────────────────────────────
// 방법 3: || 연산자 (기본값 표시)
// ─────────────────────────────────────────────
return (
  <div>
    <span>{username || '익명 사용자'}</span>
  </div>
);

// ─────────────────────────────────────────────
// 방법 4: ?? (Nullish Coalescing, null/undefined만 체크)
// ─────────────────────────────────────────────
return (
  <div>
    <span>점수: {score ?? '미응시'}</span>
    {/* score가 0이면 0 출력, null/undefined면 '미응시' 출력 */}
  </div>
);
```

### 리스트 렌더링

```jsx
// ─────────────────────────────────────────────
// 기본 리스트 렌더링
// ─────────────────────────────────────────────
const items = ['사과', '바나나', '딸기'];

return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// ─────────────────────────────────────────────
// 고유한 key 사용 (권장)
// ─────────────────────────────────────────────
const products = [
  { id: 1, name: '사과', price: 1000 },
  { id: 2, name: '바나나', price: 2000 }
];

return (
  <ul>
    {products.map(product => (
      <li key={product.id}>
        {product.name} - {product.price.toLocaleString()}원
      </li>
    ))}
  </ul>
);

// ─────────────────────────────────────────────
// 빈 배열 처리
// ─────────────────────────────────────────────
return (
  <div>
    {products.length > 0 ? (
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    ) : (
      <p>상품이 없습니다.</p>
    )}
  </div>
);

// ─────────────────────────────────────────────
// 중첩 리스트 렌더링
// ─────────────────────────────────────────────
const categories = [
  { id: 1, name: '과일', items: ['사과', '바나나'] },
  { id: 2, name: '채소', items: ['당근', '브로콜리'] }
];

return (
  <div>
    {categories.map(category => (
      <div key={category.id}>
        <h3>{category.name}</h3>
        <ul>
          {category.items.map((item, index) => (
            <li key={`${category.id}-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
```

---

## 4. 컴포넌트 (Component)

컴포넌트는 UI를 독립적이고 재사용 가능한 조각으로 나눈 것이다.
React 애플리케이션은 컴포넌트 트리로 구성된다.

### 함수형 컴포넌트 (권장)

```jsx
// ─────────────────────────────────────────────
// 기본 함수형 컴포넌트
// ─────────────────────────────────────────────
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// ─────────────────────────────────────────────
// 화살표 함수 (많이 사용)
// ─────────────────────────────────────────────
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// 한 줄일 때 암시적 반환
const Welcome = () => <h1>Hello, World!</h1>;

// ─────────────────────────────────────────────
// Props 받기 (구조분해 할당 권장)
// ─────────────────────────────────────────────
function Welcome({ name, age }) {
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      <p>나이: {age}세</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 컴포넌트 사용
// ─────────────────────────────────────────────
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
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // 라이프사이클 메서드
  componentDidMount() {
    console.log('컴포넌트 마운트');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('컴포넌트 업데이트');
  }

  componentWillUnmount() {
    console.log('컴포넌트 언마운트');
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +1
        </button>
      </div>
    );
  }
}

// ※ 현재는 함수형 컴포넌트 + Hooks를 사용하는 것이 표준
// 기존 레거시 코드 유지보수 시에만 참고
```

### 컴포넌트 분리 예시

```jsx
// ─────────────────────────────────────────────
// components/layout/Header.jsx
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// components/layout/Footer.jsx
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <p>&copy; 2024 내 웹사이트. All rights reserved.</p>
    </footer>
  );
}
export default Footer;

// ─────────────────────────────────────────────
// components/layout/Layout.jsx
// ─────────────────────────────────────────────
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
export default Layout;

// ─────────────────────────────────────────────
// App.jsx
// ─────────────────────────────────────────────
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <h2>메인 콘텐츠</h2>
      <p>여기에 페이지 내용이 들어갑니다.</p>
    </Layout>
  );
}
```

### export / import 방식

```jsx
// ─────────────────────────────────────────────
// default export (파일당 1개)
// ─────────────────────────────────────────────
// Button.jsx
function Button() { /* ... */ }
export default Button;

// 가져올 때: 이름 자유롭게 지정 가능
import Button from './Button';
import MyButton from './Button';  // 다른 이름 가능

// ─────────────────────────────────────────────
// named export (파일당 여러 개 가능)
// ─────────────────────────────────────────────
// utils.js
export function formatDate() { /* ... */ }
export function formatCurrency() { /* ... */ }
export const API_URL = 'https://api.example.com';

// 가져올 때: 정확한 이름 사용
import { formatDate, formatCurrency, API_URL } from './utils';

// 별칭 사용
import { formatDate as fd } from './utils';

// 전체 가져오기
import * as Utils from './utils';
Utils.formatDate();
```

---

## 5. Props & State

### Props (Properties)

Props는 부모 컴포넌트에서 자식 컴포넌트로 전달하는 **읽기 전용** 데이터이다.

```jsx
// ─────────────────────────────────────────────
// Props 기본 사용
// ─────────────────────────────────────────────
function UserCard({ name, email, isAdmin }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{email}</p>
      {isAdmin && <span className="badge">관리자</span>}
    </div>
  );
}

// ─────────────────────────────────────────────
// Props 기본값 설정 (defaultProps 대체)
// ─────────────────────────────────────────────
function Button({ text = "클릭", color = "blue", size = "medium" }) {
  return (
    <button
      style={{ backgroundColor: color }}
      className={`btn btn-${size}`}
    >
      {text}
    </button>
  );
}

// ─────────────────────────────────────────────
// children props (컴포넌트 합성)
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Props spread (나머지 props 전달)
// ─────────────────────────────────────────────
function Input({ label, ...rest }) {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
}

// 사용: type, placeholder 등이 input에 그대로 전달됨
<Input label="이름" type="text" placeholder="이름을 입력하세요" required />

// ─────────────────────────────────────────────
// PropTypes로 타입 검증 (선택사항)
// ─────────────────────────────────────────────
import PropTypes from 'prop-types';

function UserCard({ name, age, email }) {
  return (/* ... */);
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string.isRequired
};

UserCard.defaultProps = {
  age: 0
};
```

### State (상태)

State는 컴포넌트 내부에서 관리되는 **변경 가능한** 데이터이다.
State가 변경되면 컴포넌트가 리렌더링된다.

```jsx
import { useState } from 'react';

// ─────────────────────────────────────────────
// 기본 사용법
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// 함수형 업데이트 (이전 상태 기반)
// ─────────────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0);

  const incrementThree = () => {
    // ❌ 이렇게 하면 1만 증가 (배치 처리 때문)
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    // ⭕ 함수형 업데이트로 3 증가
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={incrementThree}>+3</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// 지연 초기화 (비용이 큰 초기값 계산)
// ─────────────────────────────────────────────
function ExpensiveComponent() {
  // 함수를 전달하면 최초 렌더링 시 한 번만 실행
  const [data, setData] = useState(() => {
    return computeExpensiveValue(); // 비용이 큰 계산
  });

  return (/* ... */);
}
```

### State 불변성 (Immutability)

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: '공부하기', done: false },
    { id: 2, text: '운동하기', done: false }
  ]);

  // ─────────────────────────────────────────
  // 배열에 추가
  // ─────────────────────────────────────────
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  // ─────────────────────────────────────────
  // 배열에서 삭제
  // ─────────────────────────────────────────
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // ─────────────────────────────────────────
  // 배열 요소 수정
  // ─────────────────────────────────────────
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // ─────────────────────────────────────────
  // 객체 수정
  // ─────────────────────────────────────────
  const [user, setUser] = useState({ name: '홍길동', age: 25, address: { city: '서울' } });

  // 얕은 복사
  const updateAge = (newAge) => {
    setUser({ ...user, age: newAge });
  };

  // 중첩 객체 수정
  const updateCity = (newCity) => {
    setUser({
      ...user,
      address: { ...user.address, city: newCity }
    });
  };
}
```

### Props vs State 비교

| 구분 | Props | State |
|------|-------|-------|
| 데이터 출처 | 부모 컴포넌트 | 컴포넌트 자체 |
| 변경 가능 | ❌ (읽기 전용) | ⭕ (setState로 변경) |
| 역할 | 컴포넌트 설정값 전달 | UI 상호작용 관리 |
| 리렌더링 | 부모에서 새 값 전달 시 | setState 호출 시 |
| 주체 | 부모가 결정 | 컴포넌트 자신이 관리 |

---

## 6. React Hooks

Hooks는 함수형 컴포넌트에서 state와 라이프사이클 기능을 사용할 수 있게 해주는 함수이다.

### Hooks 규칙

```
1. 최상위에서만 호출 (조건문, 반복문, 중첩 함수 내부에서 호출 금지)
2. React 함수형 컴포넌트 또는 커스텀 Hook 내에서만 호출
3. 커스텀 Hook은 반드시 "use"로 시작
```

```jsx
// ❌ 조건문 안에서 Hook 호출 금지
function Component() {
  if (condition) {
    const [value, setValue] = useState(0);  // ❌
  }
}

// ⭕ 최상위에서 호출
function Component() {
  const [value, setValue] = useState(0);  // ⭕

  if (condition) {
    // value 사용
  }
}
```

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

  // ─────────────────────────────────────────
  // 패턴 1: 마운트 시 1회 실행 (빈 의존성 배열)
  // ─────────────────────────────────────────
  useEffect(() => {
    console.log('컴포넌트 마운트');

    // 클린업 함수 (언마운트 시 실행)
    return () => {
      console.log('컴포넌트 언마운트');
    };
  }, []);

  // ─────────────────────────────────────────
  // 패턴 2: 특정 값 변경 시 실행
  // ─────────────────────────────────────────
  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, [userId]);  // userId가 변경될 때마다 실행

  // ─────────────────────────────────────────
  // 패턴 3: 매 렌더링마다 실행 (의존성 배열 없음, 거의 사용 안 함)
  // ─────────────────────────────────────────
  useEffect(() => {
    document.title = `사용자: ${user?.name}`;
  });

  // ─────────────────────────────────────────
  // 클린업 함수 활용 예시
  // ─────────────────────────────────────────
  useEffect(() => {
    // 이벤트 리스너 등록
    const handleResize = () => console.log(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // 클린업: 이벤트 리스너 해제
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ─────────────────────────────────────────
  // 타이머 클린업
  // ─────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (/* ... */);
}
```

### useEffect 의존성 배열 정리

| 의존성 배열 | 실행 시점 | 용도 |
|------------|----------|------|
| `[]` | 마운트 시 1회 | 초기 데이터 fetch, 이벤트 등록 |
| `[a, b]` | a 또는 b 변경 시 | 특정 값에 반응 |
| 생략 | 매 렌더링마다 | (거의 사용 안 함) |

### useRef - DOM 접근 & 값 유지

```jsx
import { useRef, useState, useEffect } from 'react';

// ─────────────────────────────────────────────
// 용도 1: DOM 요소 접근
// ─────────────────────────────────────────────
function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 자동 포커스
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}

// ─────────────────────────────────────────────
// 용도 2: 렌더링 없이 값 유지 (렌더링 사이 값 보존)
// ─────────────────────────────────────────────
function Timer() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;  // 렌더링 발생 안함
    console.log(countRef.current);
  };

  return <button onClick={increment}>증가</button>;
}

// ─────────────────────────────────────────────
// 용도 3: 이전 값 기억
// ─────────────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>현재: {count}, 이전: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// 용도 4: 타이머/인터벌 ID 저장
// ─────────────────────────────────────────────
function StopWatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>{time}초</p>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
    </div>
  );
}
```

### useRef vs useState 비교

| 구분 | useRef | useState |
|------|--------|----------|
| 값 변경 시 리렌더링 | ❌ | ⭕ |
| 접근 방법 | `ref.current` | 직접 사용 |
| 용도 | DOM 접근, 값 보존 | UI에 반영할 상태 |
| 렌더링 간 유지 | ⭕ | ⭕ |

### useMemo - 계산 결과 메모이제이션

```jsx
import { useMemo, useState } from 'react';

function ProductList({ products, filterText }) {
  // products나 filterText가 변경될 때만 재계산
  const filteredProducts = useMemo(() => {
    console.log('필터링 재계산');
    return products.filter(p =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]);

  // 비용이 큰 계산 메모이제이션
  const statistics = useMemo(() => {
    return {
      total: products.length,
      avgPrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
      maxPrice: Math.max(...products.map(p => p.price))
    };
  }, [products]);

  return (
    <div>
      <p>총 {statistics.total}개, 평균 {statistics.avgPrice}원</p>
      <ul>
        {filteredProducts.map(p => (
          <li key={p.id}>{p.name}: {p.price}원</li>
        ))}
      </ul>
    </div>
  );
}
```

### useCallback - 함수 메모이제이션

```jsx
import { useCallback, useState, memo } from 'react';

// React.memo로 감싼 자식 컴포넌트 (props 변경 시에만 리렌더링)
const ChildButton = memo(({ onClick, label }) => {
  console.log(`${label} 렌더링`);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // useCallback 없이: Parent 리렌더링 시 매번 새 함수 생성
  // → ChildButton도 매번 리렌더링
  // const handleClick = () => setCount(prev => prev + 1);

  // useCallback 사용: 의존성이 변경되지 않으면 같은 함수 참조 유지
  // → ChildButton 불필요한 리렌더링 방지
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <p>카운트: {count}</p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ChildButton onClick={handleClick} label="증가" />
    </div>
  );
}
```

### useReducer - 복잡한 상태 관리

```jsx
import { useReducer } from 'react';

// ─────────────────────────────────────────────
// 리듀서 함수 정의
// ─────────────────────────────────────────────
const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          done: false
        }]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, done: !todo.done }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────
// 컴포넌트에서 사용
// ─────────────────────────────────────────────
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleAdd = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.done;
    if (state.filter === 'completed') return todo.done;
    return true;
  });

  return (
    <div>
      <button onClick={() => handleAdd('새 할일')}>추가</button>
      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>전체</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>미완료</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>완료</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => handleToggle(todo.id)}
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useState vs useReducer 선택 기준

| 상황 | useState | useReducer |
|------|----------|------------|
| 단순한 값 (숫자, 문자열, boolean) | ⭕ | |
| 독립적인 상태 여러 개 | ⭕ | |
| 연관된 상태 여러 개 | | ⭕ |
| 복잡한 상태 업데이트 로직 | | ⭕ |
| 다음 상태가 이전 상태에 의존 | | ⭕ |
| 상태 로직 테스트 필요 | | ⭕ |

### Hooks 전체 요약

| Hook | 용도 | 핵심 |
|------|------|------|
| `useState` | 상태 관리 | 컴포넌트 내 변경 가능한 데이터 |
| `useEffect` | 사이드 이펙트 | 데이터 fetch, 구독, DOM 조작 |
| `useRef` | DOM 접근 / 값 유지 | 리렌더링 없이 값 보존 |
| `useMemo` | 계산 결과 캐싱 | 비용 큰 연산 최적화 |
| `useCallback` | 함수 참조 캐싱 | 자식 컴포넌트 리렌더링 방지 |
| `useReducer` | 복잡한 상태 관리 | Redux와 유사한 패턴 |
| `useContext` | 전역 상태 접근 | Context API 사용 |
| `useLayoutEffect` | DOM 측정 | 페인트 전 동기 실행 |
| `useId` | 고유 ID 생성 | 접근성 속성에 활용 |

---

## 7. 이벤트 처리

React에서 이벤트는 camelCase로 작성하며, JSX에 문자열이 아닌 함수를 전달한다.

### 기본 이벤트 처리

```jsx
function Button() {
  // ─────────────────────────────────────────
  // 방법 1: 핸들러 함수 선언 (권장)
  // ─────────────────────────────────────────
  const handleClick = () => {
    alert('클릭됨!');
  };

  return <button onClick={handleClick}>클릭</button>;
}

// ─────────────────────────────────────────────
// 방법 2: 인라인 함수 (간단한 로직)
// ─────────────────────────────────────────────
function Button() {
  return (
    <button onClick={() => alert('클릭됨!')}>
      클릭
    </button>
  );
}

// ─────────────────────────────────────────────
// ⚠️ 주의: 함수를 "호출"하면 안 됨
// ─────────────────────────────────────────────
<button onClick={handleClick}>클릭</button>   // ⭕ 함수 참조 전달
<button onClick={handleClick()}>클릭</button>  // ❌ 즉시 실행됨!
```

### 이벤트 객체 (e / event)

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();  // 기본 동작 방지 (폼 새로고침 방지)
    console.log('폼 제출');
  };

  const handleChange = (e) => {
    console.log(e.target.value);  // 입력값
    console.log(e.target.name);   // input name 속성
    console.log(e.target.type);   // input type
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter 키 입력');
    }
    if (e.key === 'Escape') {
      console.log('ESC 키 입력');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="사용자명"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

### 자주 사용하는 이벤트

| 이벤트 | 설명 | 사용 예시 |
|--------|------|----------|
| `onClick` | 클릭 | 버튼, 링크 |
| `onChange` | 값 변경 | input, select, textarea |
| `onSubmit` | 폼 제출 | form |
| `onFocus` | 포커스 획득 | input (활성화 시 스타일 변경) |
| `onBlur` | 포커스 잃음 | input (유효성 검사) |
| `onKeyDown` | 키보드 누름 | 단축키, Enter 입력 처리 |
| `onKeyUp` | 키보드 뗌 | 키 입력 후 처리 |
| `onMouseEnter` | 마우스 진입 | 호버 효과 |
| `onMouseLeave` | 마우스 떠남 | 호버 해제 |
| `onScroll` | 스크롤 | 무한 스크롤, 스크롤 위치 감지 |
| `onCopy` | 복사 | 복사 방지, 커스텀 복사 |
| `onDrag` | 드래그 | 드래그 앤 드롭 |
| `onDrop` | 드롭 | 파일 업로드 |

### 함수에 인수 전달

```jsx
function ItemList() {
  const handleDelete = (id, name) => {
    console.log(`아이템 ${name}(${id}) 삭제`);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          {/* 방법 1: 화살표 함수로 감싸서 인수 전달 */}
          <button onClick={() => handleDelete(item.id, item.name)}>
            삭제
          </button>

          {/* 방법 2: 이벤트 객체도 함께 전달 */}
          <button onClick={(e) => handleDelete(item.id, item.name, e)}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### 이벤트 핸들러 네이밍 컨벤션

```jsx
// 핸들러 함수: handle + 이벤트 대상 + 동작
const handleButtonClick = () => {};
const handleInputChange = () => {};
const handleFormSubmit = () => {};
const handleModalClose = () => {};

// Props로 전달 시: on + 이벤트 대상 + 동작
<Child onItemDelete={handleItemDelete} />
<Child onFormSubmit={handleFormSubmit} />
<Modal onClose={handleModalClose} />
```

---

## 8. 조건부 렌더링 패턴

```jsx
// ─────────────────────────────────────────────
// 패턴 1: Early Return (가드 패턴, 가장 권장)
// ─────────────────────────────────────────────
function UserGreeting({ user, isLoading, error }) {
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!user) return <div>사용자 없음</div>;

  return <div>안녕하세요, {user.name}님!</div>;
}

// ─────────────────────────────────────────────
// 패턴 2: 삼항 연산자 (2가지 상태)
// ─────────────────────────────────────────────
function Content({ isLoggedIn }) {
  return isLoggedIn ? <Dashboard /> : <LoginForm />;
}

// ─────────────────────────────────────────────
// 패턴 3: && 연산자 (있을 때만 표시)
// ─────────────────────────────────────────────
function Notification({ count }) {
  return (
    <div>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────
// 패턴 4: 객체 맵핑 (다중 상태)
// ─────────────────────────────────────────────
const STATUS_MESSAGES = {
  idle: null,
  loading: <Spinner />,
  success: <SuccessMessage />,
  error: <ErrorMessage />
};

function StatusDisplay({ status }) {
  return <div>{STATUS_MESSAGES[status]}</div>;
}

// ─────────────────────────────────────────────
// 패턴 5: 컴포넌트 맵핑 (동적 컴포넌트)
// ─────────────────────────────────────────────
const STEP_COMPONENTS = {
  1: PersonalInfo,
  2: AddressInfo,
  3: PaymentInfo,
  4: Confirmation
};

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const StepComponent = STEP_COMPONENTS[step];

  return (
    <div>
      <StepComponent onNext={() => setStep(step + 1)} />
    </div>
  );
}

// ─────────────────────────────────────────────
// 패턴 6: IIFE (즉시 실행 함수, 복잡한 조건)
// ─────────────────────────────────────────────
function ComplexCondition({ status, role }) {
  return (
    <div>
      {(() => {
        if (status === 'loading') return <Spinner />;
        if (status === 'error') return <Error />;
        if (role === 'admin') return <AdminPanel />;
        return <UserPanel />;
      })()}
    </div>
  );
}
```

---

## 9. 폼 다루기

### 제어 컴포넌트 (Controlled Component)

React state가 폼 데이터의 "유일한 진실 공급원(single source of truth)"이 되는 방식이다.

```jsx
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 입력 시 해당 필드 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = '이메일을 입력하세요';
    if (!formData.email.includes('@')) newErrors.email = '올바른 이메일 형식이 아닙니다';
    if (!formData.password) newErrors.password = '비밀번호를 입력하세요';
    if (formData.password.length < 6) newErrors.password = '6자 이상 입력하세요';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('로그인 시도:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}
```

### 비제어 컴포넌트 (Uncontrolled Component)

```jsx
import { useRef } from 'react';

function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('이메일:', emailRef.current.value);
    console.log('비밀번호:', passwordRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" placeholder="이메일" />
      <input ref={passwordRef} type="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}
```

### 다양한 폼 요소 다루기

```jsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    username: '',
    bio: '',
    notifications: true,
    theme: 'light',
    language: 'ko',
    interests: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 다중 체크박스 처리
  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value)
    }));
  };

  return (
    <form>
      {/* 텍스트 입력 */}
      <input
        type="text"
        name="username"
        value={settings.username}
        onChange={handleChange}
        placeholder="사용자명"
      />

      {/* 텍스트 영역 */}
      <textarea
        name="bio"
        value={settings.bio}
        onChange={handleChange}
        placeholder="자기소개"
        rows={4}
      />

      {/* 체크박스 (단일) */}
      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange}
        />
        알림 허용
      </label>

      {/* 체크박스 (다중) */}
      <fieldset>
        <legend>관심사</legend>
        {['개발', '디자인', '마케팅'].map(interest => (
          <label key={interest}>
            <input
              type="checkbox"
              value={interest}
              checked={settings.interests.includes(interest)}
              onChange={handleInterestChange}
            />
            {interest}
          </label>
        ))}
      </fieldset>

      {/* 라디오 버튼 */}
      <fieldset>
        <legend>테마</legend>
        {['light', 'dark', 'system'].map(theme => (
          <label key={theme}>
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={settings.theme === theme}
              onChange={handleChange}
            />
            {theme}
          </label>
        ))}
      </fieldset>

      {/* 셀렉트 */}
      <select
        name="language"
        value={settings.language}
        onChange={handleChange}
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>

      {/* 파일 입력 (항상 비제어) */}
      <input
        type="file"
        onChange={(e) => console.log(e.target.files[0])}
      />
    </form>
  );
}
```

### 제어 vs 비제어 컴포넌트

| 구분 | 제어 컴포넌트 | 비제어 컴포넌트 |
|------|-------------|----------------|
| 데이터 관리 | React state | DOM 자체 |
| 값 접근 | state 변수 | ref.current.value |
| 실시간 검증 | ⭕ | ❌ |
| 조건부 비활성화 | ⭕ | 어려움 |
| 사용 빈도 | 대부분 | 파일 입력, 간단한 폼 |

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
    setItems(prev => [...prev, newItem]);
  };

  return (
    <div>
      <Child onAddItem={handleAddItem} />
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

function Child({ onAddItem }) {
  const handleClick = () => {
    onAddItem({ id: Date.now(), name: '새 아이템' });
  };

  return <button onClick={handleClick}>아이템 추가</button>;
}
```

### 형제 컴포넌트 통신 (State 끌어올리기)

```jsx
function Parent() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      {/* 형제 A: 선택 이벤트 발생 */}
      <ItemList onSelect={setSelectedId} />

      {/* 형제 B: 선택된 ID 사용 */}
      <ItemDetail selectedId={selectedId} />
    </div>
  );
}

function ItemList({ onSelect }) {
  const items = [
    { id: 1, name: '아이템 1' },
    { id: 2, name: '아이템 2' }
  ];

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

function ItemDetail({ selectedId }) {
  if (!selectedId) return <p>아이템을 선택하세요</p>;
  return <p>선택된 아이템 ID: {selectedId}</p>;
}
```

### 통신 방법 선택 가이드

| 관계 | 방법 |
|------|------|
| 부모 → 자식 | Props |
| 자식 → 부모 | 콜백 함수 Props |
| 형제 간 | State 끌어올리기 |
| 깊은 중첩 (Prop Drilling 문제) | Context API |
| 전역 상태 (복잡한 앱) | Zustand, Redux 등 |

---

## 11. 커스텀 Hooks

반복되는 로직을 재사용 가능한 함수로 추출한다.
커스텀 Hook은 반드시 `use`로 시작해야 한다.

### useInput - 입력 필드 관리

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

// ─────────────────────────────────────────────
// 사용
// ─────────────────────────────────────────────
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
      {/* spread로 value, onChange 한번에 전달 */}
      <input {...email} placeholder="이메일" />
      <input {...password} type="password" placeholder="비밀번호" />
      <button>제출</button>
    </form>
  );
}
```

### useToggle - 토글 상태 관리

```jsx
// hooks/useToggle.js
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// ─────────────────────────────────────────────
// 사용
// ─────────────────────────────────────────────
function Modal() {
  const modal = useToggle(false);
  const darkMode = useToggle(false);

  return (
    <>
      <button onClick={modal.toggle}>모달 열기</button>
      <button onClick={darkMode.toggle}>
        {darkMode.value ? '🌙' : '☀️'}
      </button>

      {modal.value && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>모달 제목</h2>
            <p>모달 내용</p>
            <button onClick={modal.setFalse}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
}
```

### useFetch - 데이터 페칭

```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 클린업: 컴포넌트 언마운트 시 요청 취소
    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// ─────────────────────────────────────────────
// 사용
// ─────────────────────────────────────────────
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### useLocalStorage - 로컬 스토리지 동기화

```jsx
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// ─────────────────────────────────────────────
// 사용
// ─────────────────────────────────────────────
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'ko');

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        현재 테마: {theme}
      </button>
    </div>
  );
}
```

### useDebounce - 디바운스

```jsx
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─────────────────────────────────────────────
// 사용
// ─────────────────────────────────────────────
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data: results } = useFetch(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      <ul>
        {results?.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 12. Context API & 전역 상태 관리

Context API는 Props Drilling 없이 컴포넌트 트리 전체에 데이터를 전달할 수 있는 React 내장 기능이다.

### Props Drilling 문제

```jsx
// ❌ Props Drilling: 중간 컴포넌트가 불필요하게 props를 전달
function App() {
  const [user, setUser] = useState({ name: '홍길동' });
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />;  // Header는 user를 사용하지 않음
}

function Navigation({ user }) {
  return <UserMenu user={user} />;    // Navigation도 user를 사용하지 않음
}

function UserMenu({ user }) {
  return <span>{user.name}</span>;    // 실제로 user를 사용하는 곳
}
```

### Context API 기본 사용법

```jsx
import { createContext, useContext, useState } from 'react';

// ─────────────────────────────────────────────
// 1단계: Context 생성
// ─────────────────────────────────────────────
const ThemeContext = createContext();

// ─────────────────────────────────────────────
// 2단계: Provider 컴포넌트 생성
// ─────────────────────────────────────────────
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─────────────────────────────────────────────
// 3단계: 커스텀 Hook으로 편리하게 사용
// ─────────────────────────────────────────────
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 내부에서 사용해야 합니다');
  }
  return context;
}

// ─────────────────────────────────────────────
// 4단계: App에서 Provider로 감싸기
// ─────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

// ─────────────────────────────────────────────
// 5단계: 어디서든 useTheme으로 접근
// ─────────────────────────────────────────────
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
      </button>
    </header>
  );
}
```

### 인증 Context 예시 (실무 패턴)

```jsx
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token)
        .then(setUser)
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용해야 합니다');
  }
  return context;
}

// ─────────────────────────────────────────────
// 사용
// ─────────────────────────────────────────────
function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>{user.name}님</span>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <a href="/login">로그인</a>
      )}
    </nav>
  );
}
```

### 여러 Context 조합

```jsx
// App.jsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

### Context API 사용 시 주의사항

| 주의사항 | 설명 |
|---------|------|
| Provider value 변경 시 | 하위 모든 Consumer가 리렌더링됨 |
| 분리 권장 | 자주 바뀌는 값과 안 바뀌는 값은 Context 분리 |
| 남용 금지 | 단순 Props 전달에는 Context 대신 Props 사용 |
| 큰 규모 | 복잡한 전역 상태는 Zustand, Redux 등 고려 |

---

## 13. React Router

SPA(Single Page Application)에서 페이지 간 이동을 처리한다.

### 설치 및 기본 설정

```bash
npm install react-router-dom
```

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* Link: 페이지 새로고침 없이 이동 */}
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/products">상품</Link>

        {/* NavLink: 활성 경로에 자동으로 className 적용 */}
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          홈
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 동적 라우트 & URL 파라미터

```jsx
import { useParams, useSearchParams } from 'react-router-dom';

// URL: /products/123
function ProductDetail() {
  const { id } = useParams();

  return <h1>상품 ID: {id}</h1>;
}

// URL: /search?q=react&page=2
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');       // 'react'
  const page = searchParams.get('page');     // '2'

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: newPage });
  };

  return (
    <div>
      <p>검색어: {query}, 페이지: {page}</p>
      <button onClick={() => handlePageChange(Number(page) + 1)}>
        다음 페이지
      </button>
    </div>
  );
}
```

### 프로그래밍 방식 네비게이션

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();

    // 페이지 이동
    navigate('/dashboard');

    // 뒤로가기
    navigate(-1);

    // 히스토리 교체 (뒤로가기 시 이전 페이지로 안 감)
    navigate('/dashboard', { replace: true });

    // state 전달
    navigate('/result', { state: { from: 'login' } });
  };

  return <button onClick={handleLogin}>로그인</button>;
}

// state 받기
import { useLocation } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const from = location.state?.from; // 'login'

  return <p>이전 페이지: {from}</p>;
}
```

### 중첩 라우트 (Nested Routes)

```jsx
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Outlet: 자식 라우트가 렌더링되는 위치
function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />  {/* 여기에 자식 라우트 컴포넌트가 렌더링 */}
      </main>
      <Footer />
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>
      <nav>
        <Link to="">홈</Link>
        <Link to="settings">설정</Link>
        <Link to="profile">프로필</Link>
      </nav>
      <Outlet />  {/* DashboardHome, Settings, Profile 렌더링 */}
    </div>
  );
}
```

### 보호된 라우트 (Protected Route)

```jsx
import { Navigate } from 'react-router-dom';

// 인증 필요 라우트 래퍼
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

// 사용
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 14. API 통신

### fetch API

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
}
```

### axios 사용

```bash
npm install axios
```

```jsx
import axios from 'axios';

// ─────────────────────────────────────────────
// axios 인스턴스 생성 (api/index.js)
// ─────────────────────────────────────────────
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터: 모든 요청에 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 공통 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ─────────────────────────────────────────────
// API 함수 분리 (api/userApi.js)
// ─────────────────────────────────────────────
import api from './index';

export const userApi = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`)
};

// ─────────────────────────────────────────────
// 컴포넌트에서 사용
// ─────────────────────────────────────────────
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await userApi.getAll();
        setUsers(data);
      } catch (error) {
        console.error('사용자 목록 조회 실패:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreate = async (userData) => {
    try {
      const { data } = await userApi.create(userData);
      setUsers(prev => [...prev, data]);
    } catch (error) {
      console.error('사용자 생성 실패:', error);
    }
  };

  return (/* ... */);
}
```

### fetch vs axios 비교

| 구분 | fetch | axios |
|------|-------|-------|
| 내장 여부 | 브라우저 내장 | 설치 필요 |
| JSON 변환 | 수동 (.json()) | 자동 |
| 에러 처리 | HTTP 에러를 catch 안 함 | HTTP 에러도 catch |
| 인터셉터 | 없음 | 지원 |
| 요청 취소 | AbortController | CancelToken |
| 타임아웃 | 수동 구현 | 옵션으로 설정 |

---

## 15. 스타일링 방법

### 1. 일반 CSS

```jsx
// App.css에서 클래스 정의 후 import
import './App.css';

function App() {
  return <div className="container">내용</div>;
}
```

### 2. CSS 모듈 (스코프가 있는 CSS, 권장)

```css
/* Button.module.css */
.button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: #007bff;
  color: white;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.large {
  padding: 14px 28px;
  font-size: 18px;
}
```

```jsx
import styles from './Button.module.css';

function Button({ variant = 'primary', size, children }) {
  const classNames = [
    styles.button,
    styles[variant],
    size && styles[size]
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames}>
      {children}
    </button>
  );
}
```

### 3. styled-components (CSS-in-JS)

```bash
npm install styled-components
```

```jsx
import styled, { css } from 'styled-components';

// 기본 사용
const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  /* Props에 따른 스타일 변경 */
  background-color: ${props => props.$primary ? '#007bff' : '#6c757d'};
  color: white;

  /* 조건부 스타일 */
  ${props => props.$large && css`
    padding: 14px 28px;
    font-size: 18px;
  `}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 확장 (상속)
const PrimaryButton = styled(StyledButton)`
  background-color: #007bff;
`;

// 사용
function App() {
  return (
    <>
      <StyledButton $primary>기본</StyledButton>
      <StyledButton $large>큰 버튼</StyledButton>
      <PrimaryButton>주요 버튼</PrimaryButton>
    </>
  );
}
```

> **참고**: styled-components v6부터 transient props (`$` prefix)를 사용하여 DOM에 전달되지 않는 props를 구분한다.

### 4. Tailwind CSS (유틸리티 CSS, 인기 급상승)

```bash
npm install -D tailwindcss @tailwindcss/vite
```

```jsx
function Card({ title, description }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-base">{description}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        자세히 보기
      </button>
    </div>
  );
}
```

### 스타일링 방법 비교

| 방법 | 장점 | 단점 |
|------|------|------|
| CSS 모듈 | 스코프 격리, 친숙함 | 동적 스타일 어려움 |
| styled-components | 동적 스타일, 컴포넌트 기반 | 번들 크기 증가, 런타임 비용 |
| Tailwind CSS | 빠른 개발, 일관성 | 클래스명 길어짐, 학습 곡선 |
| 인라인 스타일 | 간편함 | 미디어쿼리 불가, 성능 |

---

## 16. 성능 최적화

### React.memo - 컴포넌트 메모이제이션

```jsx
import { memo } from 'react';

// props가 변경되지 않으면 리렌더링 건너뜀
const ExpensiveChild = memo(function ExpensiveChild({ data, onClick }) {
  console.log('ExpensiveChild 렌더링');
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// 커스텀 비교 함수
const OptimizedList = memo(
  function OptimizedList({ items }) {
    return (/* ... */);
  },
  (prevProps, nextProps) => {
    // true 반환 시 리렌더링 건너뜀
    return prevProps.items.length === nextProps.items.length;
  }
);
```

### 코드 스플리팅 (React.lazy & Suspense)

```jsx
import { lazy, Suspense } from 'react';

// 동적 import: 해당 컴포넌트가 필요할 때만 로드
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <BrowserRouter>
      {/* Suspense로 로딩 상태 처리 */}
      <Suspense fallback={<div>페이지 로딩 중...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 리렌더링 최적화 체크리스트

```
✅ 자식에게 전달하는 함수는 useCallback으로 메모이제이션
✅ 비용 큰 계산은 useMemo로 캐싱
✅ 리스트 컴포넌트에는 React.memo 적용
✅ key에 고유 ID 사용 (index 사용 지양)
✅ state는 필요한 컴포넌트에 최대한 가까이 배치
✅ Context 값이 자주 변하면 분리 고려
✅ 불필요한 state 사용 지양 (파생 데이터는 계산으로)
```

### 불필요한 state 제거

```jsx
// ❌ 불필요한 state (파생 데이터)
function Cart({ items }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]);

  return <p>총액: {total}</p>;
}

// ⭕ 렌더링 중 직접 계산 (또는 useMemo)
function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  // 또는: const total = useMemo(() => items.reduce(...), [items]);

  return <p>총액: {total}</p>;
}
```

---

## 17. 자주 사용하는 패턴

### 로딩 / 에러 / 데이터 상태 관리

```jsx
function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('데이터 로드 실패');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (data.length === 0) return <EmptyState message="데이터가 없습니다" />;

  return (
    <ul>
      {data.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

### 무한 스크롤

```jsx
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  // 마지막 요소 감시
  const lastItemRef = useCallback((node) => {
    if (loading) return;

    // 기존 observer 해제
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const response = await fetch(`/api/items?page=${page}`);
      const data = await response.json();

      setItems(prev => [...prev, ...data.items]);
      setHasMore(data.hasMore);
      setLoading(false);
    };
    fetchItems();
  }, [page]);

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
        >
          {item.name}
        </div>
      ))}
      {loading && <p>로딩 중...</p>}
    </div>
  );
}
```

### 디바운싱 (Debouncing) 검색

```jsx
import { useState, useEffect } from 'react';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);

  // 디바운스: 입력 후 500ms 동안 추가 입력 없으면 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // 디바운스된 쿼리로 API 호출
  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery).then(setResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 모달 (Portal 활용)

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')  // public/index.html에 <div id="modal-root"></div> 추가
  );
}

// 사용
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="알림"
      >
        <p>모달 내용입니다.</p>
      </Modal>
    </div>
  );
}
```

---

## 18. 에러 처리

### Error Boundary (클래스 컴포넌트 필수)

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 서비스에 전송
    console.error('에러 발생:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-boundary">
            <h2>문제가 발생했습니다</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={() => this.setState({ hasError: false })}>
              다시 시도
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// ─────────────────────────────────────────────
// 사용
// ─────────────────────────────────────────────
function App() {
  return (
    <ErrorBoundary fallback={<div>앱에 오류가 발생했습니다</div>}>
      <Header />
      <ErrorBoundary fallback={<div>콘텐츠 로드 실패</div>}>
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
```

### try-catch 패턴 (이벤트 핸들러, 비동기)

```jsx
function Form() {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('제출에 실패했습니다');
      }

      const data = await response.json();
      // 성공 처리
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-banner">{error}</div>}
      {/* 폼 필드들 */}
    </form>
  );
}
```

---

## 19. 테스팅 기초

### React Testing Library 기본

```bash
# CRA에는 기본 포함, Vite에서는 별도 설치
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

```jsx
// Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter 컴포넌트', () => {
  test('초기값이 0으로 렌더링된다', () => {
    render(<Counter />);
    expect(screen.getByText('카운트: 0')).toBeInTheDocument();
  });

  test('+1 버튼 클릭 시 카운트가 증가한다', () => {
    render(<Counter />);
    const button = screen.getByText('+1');
    fireEvent.click(button);
    expect(screen.getByText('카운트: 1')).toBeInTheDocument();
  });

  test('리셋 버튼 클릭 시 카운트가 0으로 초기화된다', () => {
    render(<Counter />);

    // 먼저 증가
    fireEvent.click(screen.getByText('+1'));
    fireEvent.click(screen.getByText('+1'));
    expect(screen.getByText('카운트: 2')).toBeInTheDocument();

    // 리셋
    fireEvent.click(screen.getByText('리셋'));
    expect(screen.getByText('카운트: 0')).toBeInTheDocument();
  });
});
```

### 테스트 실행

```bash
# Vitest
npx vitest

# Jest (CRA)
npm test
```

---

## 20. 주의사항 & Best Practices

### ✅ 권장사항

```
컴포넌트
  ├── 이름은 PascalCase (UserProfile, TodoItem)
  ├── 파일명과 컴포넌트 이름 일치시키기
  ├── 한 컴포넌트는 한 가지 역할만 (Single Responsibility)
  ├── 컴포넌트 크기는 작게 유지 (200줄 이하 권장)
  ├── Props는 구조분해 할당으로 받기
  └── 컴포넌트는 순수 함수처럼 작성 (동일 입력 → 동일 출력)

상태 관리
  ├── state는 최소한으로 유지
  ├── 파생 데이터는 state 대신 계산으로
  ├── state는 사용하는 컴포넌트에 최대한 가까이 배치
  └── 불변성 유지 (새 객체/배열 생성)

Hooks
  ├── 최상위에서만 호출
  ├── 의존성 배열 정확히 명시
  ├── 반복 로직은 커스텀 Hook으로 추출
  └── useEffect 클린업 함수 잊지 않기

코드 품질
  ├── ESLint + Prettier 설정
  ├── 의미 있는 변수/함수 이름 사용
  ├── 매직 넘버 대신 상수 사용
  └── 타입 안정성을 위해 TypeScript 도입 고려
```

### ❌ 피해야 할 것

```jsx
// ─────────────────────────────────────────────
// ❌ State 직접 수정 (불변성 위반)
// ─────────────────────────────────────────────
const [items, setItems] = useState([]);
items.push(newItem);           // ❌ 직접 수정
setItems([...items, newItem]); // ⭕ 새 배열 생성

const [user, setUser] = useState({ name: '', age: 0 });
user.name = '홍길동';               // ❌ 직접 수정
setUser({ ...user, name: '홍길동' }); // ⭕ 새 객체 생성

// ─────────────────────────────────────────────
// ❌ 렌더링 중 State 변경 (무한 루프)
// ─────────────────────────────────────────────
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // ❌ 렌더링 → setState → 렌더링 → ...

  // ⭕ useEffect 내에서 변경
  useEffect(() => {
    setCount(count + 1);
  }, []);
}

// ─────────────────────────────────────────────
// ❌ useEffect 의존성 누락
// ─────────────────────────────────────────────
useEffect(() => {
  fetchUser(userId);
}, []);           // ❌ userId가 의존성에 없음

useEffect(() => {
  fetchUser(userId);
}, [userId]);     // ⭕ 올바른 의존성

// ─────────────────────────────────────────────
// ❌ 이벤트 핸들러에서 함수 즉시 호출
// ─────────────────────────────────────────────
<button onClick={handleClick()}>클릭</button>   // ❌ 즉시 실행!
<button onClick={handleClick}>클릭</button>     // ⭕ 함수 참조 전달
<button onClick={() => handleClick(id)}>클릭</button> // ⭕ 인수 전달 시

// ─────────────────────────────────────────────
// ❌ 컴포넌트 내부에서 컴포넌트 정의
// ─────────────────────────────────────────────
function Parent() {
  // ❌ 매 렌더링마다 새 컴포넌트 생성 → state 초기화
  function Child() {
    return <div>자식</div>;
  }

  return <Child />;
}

// ⭕ 외부에 정의
function Child() {
  return <div>자식</div>;
}

function Parent() {
  return <Child />;
}
```

### key 사용 주의

```jsx
// ❌ index를 key로 사용 (순서가 변하는 리스트에서 문제)
// → 추가/삭제/정렬 시 잘못된 컴포넌트가 업데이트될 수 있음
{items.map((item, index) => <li key={index}>{item}</li>)}

// ⭕ 고유 ID 사용
{items.map(item => <li key={item.id}>{item.name}</li>)}

// index를 key로 써도 괜찮은 경우:
// - 리스트가 정적이고 변하지 않을 때
// - 리스트에 추가/삭제/정렬이 없을 때
```

---

## 21. 유용한 라이브러리

### 필수 라이브러리

| 라이브러리 | 용도 | 설명 |
|-----------|------|------|
| `react-router-dom` | 페이지 라우팅 | SPA 라우팅 표준 |
| `axios` | HTTP 요청 | fetch 대안, 인터셉터 지원 |

### 상태 관리

| 라이브러리 | 용도 | 특징 |
|-----------|------|------|
| `zustand` | 전역 상태 관리 | 간결한 API, 보일러플레이트 최소 |
| `recoil` | 전역 상태 관리 | React 공식팀 개발, atom 기반 |
| `redux-toolkit` | 전역 상태 관리 | 큰 규모 앱, 미들웨어 생태계 |
| `jotai` | 전역 상태 관리 | 원자(atom) 기반, 미니멀 |

### 서버 상태 관리

| 라이브러리 | 용도 | 특징 |
|-----------|------|------|
| `@tanstack/react-query` | 서버 상태 관리 | 캐싱, 자동 리페치, 로딩/에러 처리 |
| `swr` | 서버 상태 관리 | Vercel 개발, 가벼움 |

### 폼 처리

| 라이브러리 | 용도 | 특징 |
|-----------|------|------|
| `react-hook-form` | 폼 처리 | 고성능, 비제어 컴포넌트 기반 |
| `zod` / `yup` | 유효성 검증 | 스키마 기반 검증 |

### UI / 스타일링

| 라이브러리 | 용도 | 특징 |
|-----------|------|------|
| `tailwindcss` | 유틸리티 CSS | 빠른 개발, 커스터마이징 용이 |
| `styled-components` | CSS-in-JS | 컴포넌트 스코프 스타일 |
| `framer-motion` | 애니메이션 | 선언적 애니메이션 |
| `react-icons` | 아이콘 | 다양한 아이콘 패키지 통합 |
| `react-toastify` | 토스트 알림 | 간편한 알림 UI |

### 유틸리티

| 라이브러리 | 용도 | 특징 |
|-----------|------|------|
| `date-fns` / `dayjs` | 날짜 처리 | 가벼운 날짜 유틸리티 |
| `lodash` | 유틸리티 함수 | 다양한 헬퍼 함수 |
| `classnames` / `clsx` | 조건부 클래스 | className 동적 생성 |

---

## 22. 참고 자료

### 공식 문서

- [React 공식 문서 (영문)](https://react.dev/)
- [React 한글 문서](https://ko.react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [React Router 공식 문서](https://reactrouter.com/)

### 학습 자료

- [React 공식 튜토리얼](https://react.dev/learn)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/ko/docs/Web/JavaScript)
- [JavaScript.info (모던 JavaScript 튜토리얼)](https://ko.javascript.info/)

### 도구

- [React Developer Tools (Chrome 확장)](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [CodeSandbox (온라인 IDE)](https://codesandbox.io/)
- [StackBlitz (온라인 IDE)](https://stackblitz.com/)

---

> **📌 Note**: 이 문서는 React 18+ 기준으로 작성되었습니다.
> React 생태계는 빠르게 변화하므로 항상 [공식 문서](https://react.dev/)를 참고하세요.
