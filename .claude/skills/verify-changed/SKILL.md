---
description: 변경된 영역만 타입체크, 린트, 컴파일을 실행합니다.
---

# Verify Changed Code

git으로 변경이 감지된 영역만 검사하는 Stop Hook Skill입니다.

## 자동 실행

`.claude/hooks.json`의 `stop` 훅에 의해 Turn 종료 시 자동으로 실행됩니다.

## 검사 대상

### `ui/` 변경 시

- `tsc -b` — TypeScript 타입체크
- `eslint` — 린트 검사

### `api/` 변경 시

- `mvnw test-compile` — Maven Java 컴파일

## 환경변수

- `JAVA_HOME_21`: JDK 21 경로
  - 기본값: `D:\Workspace\java`
  - 재정의: `export JAVA_HOME_21="/custom/path"`

## 실패 시

- `exit 2`로 종료
- 실패 내용이 Claude Code 에이전트에게 반환됨
- 턴이 차단되고 수정 후 재시도 필요

## 변경이 없을 때

- 아무것도 실행하지 않음 (변경 탐지 시에만 실행)

## 구현 세부사항

- Git Bash 의존 (`shell: bash`)
- 무한루프 방지: stdin payload에 `stop_hook_active: true` 감지 시 스킵
- 변경 파일 감지: `git status --porcelain`
