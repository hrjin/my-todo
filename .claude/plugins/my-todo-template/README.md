# My TODO - Fullstack Project Template

Claude Code 기반 풀스택 TODO 웹앱 개발 템플릿입니다.

## 🎯 특징

### 기술 스택
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Spring Boot 4.1 (Java 21) + Maven
- **Database**: H2 Database (파일 기반)
- **DevOps**: Docker & Docker Compose (Dev/Prod)
- **State Management**: TanStack Query + React Context
- **Styling**: CSS Modules
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + TypeScript

### Harness Engineering
- **Skills** — 재사용 가능한 검증 로직 패키지
  - `validate-input/` — API/UI/Docker 검증
  - `commit-conventions/` — 커밋 메시지/브랜치 검증
  - `verify-changed/` — 타입체크/린트/컴파일 자동화

- **Hooks** — 자동 실행 시점 정의
  - `pre-commit` — 커밋 메시지 검증
  - `pre-push` — 브랜치 네이밍 검증
  - `stop` — Turn 끝에 변경 영역 검증

- **CLAUDE.md** — 프로젝트 개발 가이드 (자동 생성)

## 🚀 사용 방법

### Claude Code에서 사용

```bash
# Claude Code CLI
claude init --template my-todo-template

# 또는 Claude Code UI
Settings > Templates > "My TODO - Fullstack Project" 선택
```

### 직접 복제

```bash
git clone https://github.com/your-username/my-todo.git my-new-todo
cd my-new-todo

# 의존성 설치
cd ui && npm install
cd ../api && ./mvnw.cmd clean install
```

## 📚 프로젝트 구조

```
my-todo/
├── api/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/my/todo/api/
│   │   │   ├── todo/            # 도메인 (엔티티, DTO, 컨트롤러, 서비스)
│   │   │   ├── common/          # ApiResponse 래퍼
│   │   │   ├── exception/       # 예외 처리
│   │   │   └── config/          # CORS, 설정
│   │   └── test/java/           # 테스트
│   ├── pom.xml
│   └── application.yml

├── ui/                           # React Frontend
│   ├── src/
│   │   ├── api/                 # Axios 클라이언트
│   │   ├── hooks/               # TanStack Query 훅
│   │   ├── components/          # React 컴포넌트
│   │   ├── context/             # UI 상태 관리
│   │   └── utils/               # 유틸 함수
│   ├── package.json
│   └── vite.config.ts

├── docker/                       # Docker 설정
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── nginx.conf

├── .claude/                      # Claude Code 설정
│   ├── CLAUDE.md                # 개발 가이드
│   ├── hooks.json               # 훅 정의
│   ├── settings.json            # 프로젝트 설정
│   └── skills/                  # 검증 스킬
│       ├── commit-conventions/
│       ├── validate-input/
│       └── verify-changed/

├── docker-compose.yml           # 개발 환경
├── docker-compose.prod.yml      # 프로덕션 환경
├── CLAUDE.md                    # 프로젝트 가이드
└── README.md
```

## 🏃 빠른 시작

### 1. API 서버 실행

```bash
cd api
./mvnw.cmd spring-boot:run
# http://localhost:8080/api/todos 에서 API 테스트
# http://localhost:8080/h2-console 에서 H2 콘솔
```

### 2. UI 개발 서버 실행

```bash
cd ui
npm run dev
# http://localhost:5173 에서 앱 보기
```

### 3. Docker로 실행

```bash
# 개발 환경
docker-compose up

# 프로덕션 환경
docker-compose -f docker-compose.prod.yml up
```

## 🧪 테스트 & 검증

### Frontend
```bash
cd ui
npm test                    # 단위 테스트 실행
npm run lint               # ESLint 실행
npm run build              # TypeScript + Vite 빌드
```

### Backend
```bash
cd api
./mvnw.cmd test            # 단위 테스트 실행
./mvnw.cmd clean install   # 컴파일 & 의존성 설치
```

## 📝 API 엔드포인트

```
GET    /api/todos                 # 전체 조회
GET    /api/todos/{id}            # 단건 조회
POST   /api/todos                 # 생성
PUT    /api/todos/{id}            # 수정
DELETE /api/todos/{id}            # 삭제
PATCH  /api/todos/{id}/toggle     # 완료 토글
```

## 🛠️ 개발 가이드

자세한 개발 규칙과 아키텍처 패턴은 **CLAUDE.md**를 참고하세요:

- Backend 아키텍처
- Frontend 아키텍처
- 자동 검증 (Skills & Hooks)
- 데이터 구조 규칙
- 테스트 전략

## 📦 의존성

### 필수
- Node.js 18.0.0+
- Java 17.0.0+ (권장: 21.0.0)
- Maven 3.8.0+

### 선택사항
- Docker 20.10.0+

## 📄 라이선스

MIT License

## 🤝 기여

이 템플릿을 개선하고 싶다면:

1. 포크하기
2. 기능 브랜치 생성 (`feature/new-feature`)
3. 커밋하기 (최소 10자)
4. 푸시하고 PR 생성

## 📧 문의

문제가 있거나 제안사항이 있다면 Issues를 열어주세요.
