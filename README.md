## 🚀 TestWeaver Frontend

TestWeaver는 Pairwise·IPO 기반 자동 테스트 케이스 생성 웹 서비스로,
사용자가 프로젝트를 생성하고 테스트 파라미터를 입력하면 다양한 조합 테스트 케이스를 자동으로 생성해주는 개발 생산성 도구입니다.

본 저장소는 React.js 기반의 TestWeaver Frontend입니다.

---
### 📦 Tech Stack

#### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Context API (Auth 상태 관리)
- CSS Module / Global CSS
- JavaScript

#### Build & Deploy
- Vite
- Node.js
- (추후 적용 예정: Docker, Nginx)

---
### 🎯 Project Goals
#### 🔹 Frontend Architecture Goals

- 명확한 레이아웃 분리
Auth / Main / TestCases / Public 레이아웃을 각각 분리하여 UI 재사용 극대화
- 폴더 기반 기능 모듈화
pages / components / api / context 구조를 통해 책임을 명확히 분리
- 유지보수성을 고려한 UI 분리
Input / Button / Card 같은 공용 UI 컴포넌트 분리
- API Layer 분리
Axios 인스턴스, authApi / projectApi / testcaseApi 각각 독립

#### 🔹 본 서비스의 핵심 목적

- 실무에서 요구되는 테스트 케이스 생성 자동화
- Pairwise / IPO / IPOG 등의 알고리즘을 기반으로
최소 입력으로 최대 테스트 커버리지 확보
- QA / 개발자의 반복 작업 감소

---
### 📂 Folder Structure
```
📦src
 ┣ 📂api
 ┃ ┣ 📜authApi.js
 ┃ ┣ 📜axios.js
 ┃ ┣ 📜projectApi.js
 ┃ ┗ 📜testcaseApi.js
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂Layout
 ┃ ┃ ┣ 📂Auth
 ┃ ┃ ┃ ┣ 📜AuthLayout.jsx
 ┃ ┃ ┃ ┗ 📜AuthLayout.module.css
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜MainLayout.jsx
 ┃ ┃ ┃ ┗ 📜MainLayout.module.css
 ┃ ┃ ┣ 📂Public
 ┃ ┃ ┃ ┣ 📜PublicLayout.jsx
 ┃ ┃ ┃ ┗ 📜PublicLayout.module.css
 ┃ ┃ ┗ 📂TestCases
 ┃ ┃ ┃ ┣ 📜TestCasesLayout.jsx
 ┃ ┃ ┃ ┣ 📜TestCasesLayout.module.css
 ┃ ┃ ┃ ┗ 📜TestCasesTabs.jsx
 ┃ ┣ 📂Navigation
 ┃ ┃ ┣ 📜SideBar.jsx
 ┃ ┃ ┗ 📜SideBar.module.css
 ┃ ┗ 📂UI
 ┃ ┃ ┣ 📜Button.jsx
 ┃ ┃ ┣ 📜Button.module.css
 ┃ ┃ ┣ 📜Card.jsx
 ┃ ┃ ┣ 📜CircleVerticalBar.jsx
 ┃ ┃ ┣ 📜CircleVerticalBar.module.css
 ┃ ┃ ┣ 📜Input.jsx
 ┃ ┃ ┣ 📜Input.module.css
 ┃ ┃ ┗ 📜Loader.jsx
 ┣ 📂context
 ┃ ┗ 📜AuthContext.jsx
 ┣ 📂pages
 ┃ ┣ 📂Auth
 ┃ ┣ 📂Home
 ┃ ┣ 📂Project
 ┃ ┗ 📂TestCase
 ┣ 📂router
 ┣ 📂styles
 ┣ 📜App.jsx
 ┗ 📜main.jsx
```
---
### 🧩 Core Features (Frontend)

#### 🔐 1. 인증 기능
- 로그인 / 회원가입 / 아이디 찾기 / 비밀번호 재설정
- JWT + 쿠키 기반 인증
- ProtectedRoute로 접근 제어

#### 🗂️ 2. 프로젝트 관리
- 프로젝트 생성 / 조회
- 최근 생성한 프로젝트 목록
- 각 프로젝트별 테스트 케이스 모듈 접근 가능

#### 🧪 3. 테스트 케이스 생성
- 파라미터 입력 UI 제공
- 조합 방식(Pairwise/IPO/… ) 설정 UI
- 생성된 테스트 케이스 리스트 출력

#### 📤 4. 테스트 케이스 Export
- CSV/Excel 등(추후 백엔드 연동)

#### 🧱 5. 구조적 UI 구성
- 공통 레이아웃 구조
    - AuthLayout
    - MainLayout
    - TestCasesLayout
    - PublicLayout
- 공통 UI 컴포넌트 기반
    - Button / Input / Card / Loader

---

### 🖥️ 주요 페이지

### Auth
- LoginPage
- RegisterPage
- ResetPwPage
- FindIdPage

### Home
- 홈 화면 (TestWeaver 소개)
- Docs / Help / About

### Project
- ProjectListPage: 생성한 프로젝트 보기
- ProjectCreatePage: 새 프로젝트 생성

### TestCase
- TestCaseListPage: 생성된 테스트 케이스 목록
- TestCaseConfigPage: 파라미터 입력 / 옵션 설정

---

### 🔧 API Layer

TestWeaver는 API 레이어를 명확히 분리하여 유지보수성을 강화함:
- axios.js → 기본 설정 + interceptor
- authApi.js → 로그인·회원가입·인증 관련
- projectApi.js → 프로젝트 CRUD
- testcaseApi.js → 테스트 케이스 생성/조회

---

### 🏗️ Architecture Summary
### 📌 UI 책임 분리
- Layout / Navigation / UI를 명확히 분리하여
“레이아웃 주도 개발(Layout-driven development)” 패턴 적용.

### 📌 기능 기반 pages 구조
- Auth / Project / TestCase / Home
→ page 단위로 완전히 나누어 유지보수에 용이

### 📌 API, Context, Router 완전 분리
- 각 레이어가 독립적으로 동작하도록 설계함

---
### Getting Started

### 1. install
``` bash
npm install
```

### 2. Ren Dev
```
npm run dev
```

### Build
```
npm run build
```

---

### ✨ Author
### TestWeaver Frontend by 김평화