# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 개요
- 간단한 TODO List Web을 만든다.
- 구성은 React(FrontEnd) + SpringBoot(BackEnd, Maven) + H2(Database) + Docker(Docker Desktop을 이용해 배포)로 되어있다.
- 연동되는 프로젝트는 총 3개(React, SpringBoot, Docker Template)이다.
- 현재 MY-TODO 프로젝트 내 api, ui, docker 디렉토리이다.
- **현재 상태:** `api`는 Spring Initializr로 생성된 기본 스켈레톤(`ApiApplication.java`만 존재, 비즈니스 로직/컨트롤러/엔티티 없음)이며, `ui`와 `docker`는 아직 비어 있다.

# 기술 스택
- **BackEnd:** Spring Boot 4.1.0 (Java 21, Maven). GroupId/ArtifactId: `my.todo:api`, 루트 패키지: `my.todo.api`. 주요 스타터: `spring-boot-starter-webmvc`, `spring-boot-h2console`, `spring-boot-starter-restclient`, Lombok.
- **Database:** H2 Database (로컬 저장 경로: `D:\Workspace\data\harness-api`) — `application.properties`에 아직 datasource 설정이 없으므로, 실제 엔티티/리포지토리 구현 시 파일 기반 datasource 및 H2 콘솔 설정 추가 필요.
- **FrontEnd:** React
- **Deploy:** Docker (Docker Desktop 활용)

## 🛠️ Build & Test Commands
- **BackEnd (`api/` 디렉토리에서 실행):**
  - 서버 실행: `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`)
  - 전체 테스트: `./mvnw test` (Windows: `mvnw.cmd test`)
  - 단일 테스트 클래스/메서드: `./mvnw test -Dtest=클래스명#메서드명` (예: `mvnw.cmd test -Dtest=ApiApplicationTests#contextLoads`)
- **FrontEnd:** `npm run dev` / `npm test` (`ui` 디렉토리, 아직 스캐폴딩 전)

## 🚨 Global Rules (코딩 및 설계 절대 원칙)
- **보안:** SQL Injection 방지를 위해 반드시 ORM(JPA) 또는 Prepared Statement를 사용할 것. API Key, DB 계정 등 시크릿 키를 절대 하드코딩하지 말 것.
- **API 표준:** 모든 API 응답은 반드시 사내 표준 포맷인 `ApiResponse<T>`을 준수할 것.
- **테스트 주도/동반:** 테스트 코드가 동반되지 않은 비즈니스 로직 코드는 작성하지 말 것.
- **데이터 구조:** To-Do의 depth는 반드시 **1 레벨**로 유지할 것 (중첩 구조 금지).