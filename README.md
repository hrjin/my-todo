# my-todo
Harness Engineering 을 적용한 간단한 TODO List 작성 웹 사이트입니다.

## 📋 개요
- **Backend:** Spring Boot 4.1.0 (Java 21, Maven)
- **Frontend:** React + TypeScript (Vite)
- **Database:** H2 Database
- **Deploy:** Docker (Dockerfile.dev / Dockerfile.prod)

---

## 🔌 Template Plugin으로 사용하기

이 프로젝트는 **Claude Code Plugin**으로 등록되어 있습니다. 다른 디렉토리에서 my-todo 구조를 템플릿으로 사용할 수 있습니다.

### 🎯 Plugin의 역할

이 plugin을 통해 다른 사람들이:
- **다른 디렉토리에서** Claude Code를 열 때
- `claude init --template my-todo-template` 실행하면
- **자동으로 my-todo 프로젝트 구조 전체가 복제**됨
  - ✅ React UI (TypeScript, Vite)
  - ✅ Spring Boot API (Java 21, Maven)
  - ✅ Docker 설정 (dev/prod)
  - ✅ Skills & Hooks (자동 검증)
  - ✅ CLAUDE.md (개발 가이드)
  - ✅ 모든 설정

### 🚀 다른 사람의 사용 방법

```bash
# 1. 새 디렉토리로 이동
cd /my/new/project

# 2. Template 초기화
claude init --template my-todo-template

# 3. 프로젝트 설정값 입력 (대화형)
# - 프로젝트명 (기본: my-todo)
# - Java 버전 (21 또는 17)
# - Docker 포함 여부 (Yes/No)
# - GitHub 사용자명 (선택사항)

# 4. 완료! 전체 프로젝트 생성됨
# ✅ npm install 자동 실행
# ✅ Maven 자동 설치
# ✅ CLAUDE.md로 개발 시작 가능
```

### Plugin 파일 위치

```
.claude/plugins/my-todo-template/
├── plugin.yml       # Plugin 메타데이터, 초기화 프롬프트, 자동 명령
└── README.md        # Plugin 사용 설명서
```

---

## 🚀 빠른 시작

### 1️⃣ API 실행
```bash
cd api
./mvnw spring-boot:run
# http://localhost:8080/api/todos 접근 가능
```

### 2️⃣ UI 개발 서버 실행
```bash
cd ui
npm install
npm run dev
# http://localhost:5173 접근 가능
```

### 3️⃣ Docker 실행 (선택사항)
```bash
# 개발
docker-compose up

# 프로덕션
docker-compose -f docker-compose.prod.yml up
```

---

## ✅ 검증 가이드 (중요한 것 위주)

### 📌 A. API 검증

**1. API 정상 작동 확인**
```bash
cd api

# 서버 실행
./mvnw spring-boot:run

# 다른 터미널에서 테스트
curl http://localhost:8080/api/todos
```

**2. H2 콘솔 확인**
```
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:file:D:\Workspace\data\harness-api
```

**3. 테스트 실행**
```bash
./mvnw test
```

---

### 📌 B. UI 검증

**1. 타입체크**
```bash
cd ui
npm run build
# 또는
tsc -b
```

**2. 린트**
```bash
npm run lint
```

**3. 개발 서버 실행**
```bash
npm run dev
# http://localhost:5173
# - Inbox, Today, Upcoming, Completed 필터 확인
# - Add Task 버튼 → 제목 입력 제약 (maxLength=200) 확인
# - 설명 입력 제약 (maxLength=1000) 확인
# - Category, Priority, Due Date 입력 확인
```

**4. 입력값 제약 검증 (Skills)**
```bash
bash .claude/skills/validate-input.sh ui
# UI의 maxLength 설정 확인
```

---

### 📌 C. Git Hooks 검증

**1. 커밋 메시지 검증 (10자 이상)**
```bash
# ❌ 실패 (10자 미만)
git commit -m "추가"
# Error: 커밋 메시지 검증 실패

# ✅ 성공 (10자 이상)
git commit -m "API 엔드포인트 추가"
```

**2. 브랜치 네이밍 검증**
```bash
# ✅ 올바른 브랜치명 (푸시 시도)
git checkout -b feature/add-priority-filter
git push origin feature/add-priority-filter

# ✅ 올바른 패턴:
# - feature/add-*
# - fix/fix-*
# - refactor/refactor-*
# - test/add-*

# ❌ 잘못된 패턴 (푸시 실패)
# - add-feature (패턴 미일치)
# - bugfix/layout (브랜치명 미일치)
```

---

### 📌 D. Docker 검증

**1. 이미지 빌드 (DEV)**
```bash
docker build -f docker/Dockerfile.dev -t my-todo:dev .
# 빌드 성공 확인
```

**2. 이미지 빌드 (PROD)**
```bash
docker build -f docker/Dockerfile.prod -t my-todo:prod .
# 빌드 성공 확인
```

**3. Docker Compose 실행 (DEV)**
```bash
docker-compose up
# http://localhost:8080  - API
# http://localhost:3000  - UI (nginx)
```

**4. 헬스체크 확인**
```bash
# 컨테이너 실행 중에
docker-compose ps
# Status: Up (healthy) 확인
```

---

### 📌 E. Skills 검증

**1. API 입력값 검증**
```bash
bash .claude/skills/validate-input.sh api
# title: NotBlank, max=200
# description: max=1000
# category/priority: ENUM
```

**2. UI 입력값 검증**
```bash
bash .claude/skills/validate-input.sh ui
# maxLength 설정 확인
```

**3. Dockerfile 형식 검증**
```bash
bash .claude/skills/validate-input.sh docker
# Dockerfile.dev/prod 기본 구조 확인
```

---

## 📂 프로젝트 구조

```
my-todo/
├── api/                      # Spring Boot 백엔드
│   ├── src/
│   │   └── main/java/my/todo/api/
│   │       ├── todo/        # TODO 도메인
│   │       ├── common/      # ApiResponse
│   │       └── exception/   # 예외 처리
│   ├── pom.xml
│   └── mvnw*
│
├── ui/                       # React 프론트엔드
│   ├── src/
│   │   ├── api/            # API 클라이언트
│   │   ├── components/     # React 컴포넌트
│   │   ├── context/        # 상태 관리
│   │   └── utils/          # 유틸함수
│   ├── package.json
│   └── vite.config.ts
│
├── docker/                   # Docker 설정
│   ├── Dockerfile.dev       # 개발용
│   ├── Dockerfile.prod      # 프로덕션용
│   ├── nginx.conf          # Nginx 설정
│   ├── docker-compose.yml  # 개발 구성
│   └── docker-compose.prod.yml  # 프로덕션 구성
│
├── .claude/
│   ├── CLAUDE.md                # Claude Code 개발 가이드
│   ├── hooks.json               # 훅 중앙 관리
│   ├── settings.json            # 프로젝트 설정
│   ├── settings.local.json      # 개인 설정
│   ├── skills/                  # Harness Engineering Skills
│   │   ├── commit-conventions/  # 커밋 검증
│   │   ├── validate-input/      # 입력값 검증
│   │   └── verify-changed/      # 변경 영역 검증
│   └── plugins/                 # Claude Code Plugin
│       └── my-todo-template/    # Template Plugin
│           ├── plugin.yml       # Plugin 메타데이터
│           └── README.md        # Plugin 사용 설명
│
├── .git/hooks/                 # Git Hooks (사용 안 함, hooks.json 사용)
│   ├── prepare-commit-msg   # 커밋 메시지 검증 (백업)
│   └── update-ref           # 브랜치 네이밍 검증 (백업)
│
└── CLAUDE.md               # Claude Code 가이드
```

---

## 🔗 관련 문서

- **[CLAUDE.md](./CLAUDE.md)** - 프로젝트 상세 가이드
- **API 문서:** `http://localhost:8080/swagger-ui.html` (설정 시)

---

## 🛠️ 주요 명령어

| 목적 | 명령 |
|------|------|
| **API 테스트** | `cd api && ./mvnw test` |
| **UI 타입체크** | `cd ui && tsc -b` |
| **UI 린트** | `cd ui && npm run lint` |
| **API 빌드** | `cd api && ./mvnw clean package` |
| **UI 빌드** | `cd ui && npm run build` |
| **Docker 개발** | `docker-compose up` |
| **Docker 프로덕션** | `docker-compose -f docker-compose.prod.yml up` |
| **Git Hooks 테스트** | 커밋/푸시 시도 |
| **입력값 검증** | `bash .claude/skills/validate-input.sh [api\|ui\|docker]` |

---

## 📌 체크리스트 (처음 한번 해보기)

- [ ] API 실행 후 `http://localhost:8080/api/todos` 접근
- [ ] UI 개발 서버 실행 후 `http://localhost:5173` 접근
- [ ] 짧은 커밋 메시지 입력 → Git Hook 검증 확인
- [ ] 잘못된 브랜치명으로 푸시 시도 → Git Hook 검증 확인
- [ ] `docker-compose up` 실행 후 정상 작동 확인
- [ ] `bash .claude/skills/validate-input.sh ui` 실행 → 성공
