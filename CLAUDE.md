# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 개요
- 간단한 TODO List Web을 만든다.
- 구성은 React(FrontEnd) + SpringBoot(BackEnd, Maven) + H2(Database) + Docker(Docker Desktop을 이용해 배포)로 되어있다.
- 연동되는 프로젝트는 총 3개(React, SpringBoot, Docker Template)이다.
- 현재 MY-TODO 프로젝트 내 api, ui, docker 디렉토리이다.
- **현재 상태:** `api`는 Todo CRUD(생성/목록/단건조회/수정/삭제/완료토글) 및 예외처리까지 구현 완료(`todo`, `common`, `exception` 패키지). `ui`는 스캐폴딩 예정, `docker`는 아직 비어 있다.

# 기술 스택
- **BackEnd:** Spring Boot 4.1.0 (Java 21, Maven). GroupId/ArtifactId: `my.todo:api`, 루트 패키지: `my.todo.api`. 주요 스타터: `spring-boot-starter-webmvc`, `spring-boot-h2console`, `spring-boot-starter-restclient`, Lombok. 설정 파일은 `application.yml`.
- **Database:** H2 Database, 파일 기반 datasource (로컬 저장 경로: `D:\Workspace\data\harness-api`), H2 콘솔 활성화(`/h2-console`).
- **FrontEnd:** React + TypeScript (Vite). 서버 상태 관리는 TanStack Query, 스타일링은 CSS Modules, 테스트는 Vitest + React Testing Library, 린트는 ESLint(+ `@tanstack/eslint-plugin-query`). 백엔드 `ApiResponse<T>` 래퍼는 axios 인터셉터에서 언래핑.
  - ESLint 실행/규칙 관련 스킬(`.claude/skills/`)은 `ui` 스캐폴딩 완료 후 별도 작성 예정.
- **Deploy:** Docker (Docker Desktop 활용)

## 🛠️ Build & Test Commands
- **BackEnd (`api/` 디렉토리에서 실행):**
  - 서버 실행: `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`)
  - 전체 테스트: `./mvnw test` (Windows: `mvnw.cmd test`)
  - 단일 테스트 클래스/메서드: `./mvnw test -Dtest=클래스명#메서드명` (예: `mvnw.cmd test -Dtest=ApiApplicationTests#contextLoads`)
- **FrontEnd (`ui/` 디렉토리에서 실행, 아직 스캐폴딩 전):**
  - 개발 서버: `npm run dev`
  - 테스트: `npm test`

## 🚨 Global Rules (코딩 및 설계 절대 원칙)
- **보안:** SQL Injection 방지를 위해 반드시 ORM(JPA) 또는 Prepared Statement를 사용할 것. API Key, DB 계정 등 시크릿 키를 절대 하드코딩하지 말 것.
- **API 표준:** 모든 API 응답은 반드시 사내 표준 포맷인 `ApiResponse<T>`을 준수할 것.
- **테스트 주도/동반:** 테스트 코드가 동반되지 않은 비즈니스 로직 코드는 작성하지 말 것.
- **데이터 구조:** To-Do의 depth는 반드시 **1 레벨**로 유지할 것 (중첩 구조 금지).