# 🧠 SCSAC Board (SCSA 내부 지식 공유 게시판)

## 👥 팀원 소개

| <img alt="김정우 프로필" src="https://github.com/jeongwoo-right.png" width="150px"> | <img alt="김혜민 프로필" src="https://github.com/hyenem.png" width="150px"> |
| :----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| **김정우**                                                                          | **김혜민**                                                                  |
| [jeongwoo-right](https://github.com/jeongwoo-right)                                | [hyenem](https://github.com/hyenem)                                         |

## 🗂️ 프로젝트 개요

SCSAC Board는 SCSA 구성원들의 지식과 경험을 효과적으로 축적하고 공유하기 위한 **내부 게시판 플랫폼**입니다. 선후배 간 지식 단절을 해소하고, 사용자 권한 기반 운영을 통해 안정적인 커뮤니티 환경을 제공하는 것을 목표로 합니다.

### 🎯 프로젝트 목표

- 선후배 기수 간 **지식 공유 및 축적**
- **권한 기반 접근 제어**를 통한 운영의 안정성 확보
- **사용자 맞춤형 인터페이스** 제공
- 실 서비스 수준의 **풀스택 아키텍처 학습 및 배포 확장 고려**

---

## 폴더 구조
```
📦 프로젝트 루트
├─ scsac_fe/scsac-front/        # 프런트엔드 React 프로젝트
│  ├─ src/          # React 소스 (컴포넌트, 페이지, 라우터, Redux store 등)
│  ├─ public/       # 정적 파일 및 HTML 템플릿
│  └─ package.json  # 프런트엔드 의존성 및 스크립트 설정
│
├─ scsac_back/scsac-project/      # 백엔드 Spring Boot 프로젝트
│  ├─ src/main/java/com/scsac/...  # 메인 소스 (Controller, Service, Repository, Model 등 패키지별 구성)
│  ├─ src/main/resources/         # 설정 파일 (application.properties 등) 및 리소스
│  ├─ pom.xml       # Maven 프로젝트 설정 (의존성, 빌드 정보)
│  └─ ...           # 기타 백엔드 구성 파일
│
├─ DB/              # 데이터베이스 관련 (ERD 다이어그램, 초기 SQL 등)
│
└─ README.md        # 프로젝트 소개 및 기술 스택, 기능 설명 (한글)
```

---

## 실행 방법 (Source Installation & Execution Guide)

### ✅ 1. Repository Clone
```bash
git clone https://github.com/hyenem/scsac.git
```
scsac 폴더 우클릭 -> Open Git Bash here

### ✅ 2. Frontend 실행
```bash
cd scsac-fe/scsac-front
npm install
npm run dev
```

### ✅ 3. Backend 실행
1. STS 접속 -> workspace를 scsac/scsac_back으로 Launch
2. Package Explorer에서 scsac-back 우클릭 -> Run As -> Spring Boot App 클릭

### ✅ 4. DB 실행
Workbench에서 DDL.sql 실행 -> DML.sql 실행

### ✅ 5. 최종 접속 확인
http://localhost:5173/ 으로 접속

---

## 🛠️ 기술 스택

### 💻 Frontend Core
[![My Skills](https://skillicons.dev/icons?i=react,ts,css)](https://skillicons.dev)

- React (TypeScript 기반)
- Axios로 JWT 세션 기반 API 연동
- CSS3 기반 사용자 정의 스타일링
- React Router DOM을 통한 SPA 라우팅

### 🧩 Backend Core
[![My Skills](https://skillicons.dev/icons?i=spring,java,mysql)](https://skillicons.dev)


- Spring Boot (Java)
- Spring Security를 통한 JWT 인증
- JPA + Hibernate 기반 ORM
- MySQL RDBMS

### 📦 State Management
[![My Skills](https://skillicons.dev/icons?i=redux)](https://skillicons.dev)

- Redux Toolkit을 통한 전역 상태 관리
- 로그인, 사용자 정보, 알림 상태 유지

### 🎨 UI/UX
- 반응형 웹 설계 (미디어쿼리 고려)

### 🚦 Routing & Navigation
- React Router 기반 페이지 전환
- RESTful URL 패턴 설계 (`/api/articles`, `/api/categories` 등)

### 🤖 AI / NLP
[<img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" width="40px">](https://openai.com/)
- OpenAI API
- ChatGPT (GPT-3.5 Turbo API)


### 🧰 Development Tools
[![My Skills](https://skillicons.dev/icons?i=vscode,github,nodejs,maven)](https://skillicons.dev) 

- Git + GitHub 기반 버전 관리
- Talend API으로 API 테스트
- Node.js + npm으로 프론트 관리
- Maven으로 백엔드 의존성 관리

---


## 🌟 주요 기능

- 🔐 회원가입 & 로그인 (세션 기반 인증)
- 🧑 권한 기반 게시판 접근 제어
- 🗂️ 카테고리(게시판) 생성 및 권한 부여 
- 📝 게시글 CRUD (수정 시 수정됨 표시)
- 게시판 내 게시글 사용자 맞춤 정렬
- 💬 댓글 작성, 삭제 및 실시간 알림 기능으로 실시간 피드백 루프 형성
- 👤 마이페이지를 통한 개인정보 수정
- 🧠 Open API ChatGPT 3.5 Turbo를 이용한 게시판 기반 질의 답변 기능


## ✨ 특장점

- 📚 기수 간 노하우 전파를 위한 구조화된 지식 공유
- 🛡️ 관리자 중심의 체계적인 권한 제어 시스템
- 🔁 실시간 피드백을 위한 댓글 알림 시스템
- 🔧 React + Spring Boot 기반의 확장 가능한 구조
- 🚀 실제 서비스 배포를 염두에 둔 모듈화 아키텍처
