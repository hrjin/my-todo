---
description: API 요청 본문, UI 입력폼, Dockerfile 형식을 검증합니다.
---

# Input Validation Skill

입력값이 프로젝트 규칙을 따르는지 검증하는 스킬입니다.

## 사용법

```bash
bash .claude/skills/validate-input/scripts/validate.sh [api|ui|docker]
```

## 옵션

- **api** — API 요청 본문 검증 (TodoCreateRequest/UpdateRequest)
- **ui** — UI 입력폼 제약조건 검증 (maxLength 등)
- **docker** — Dockerfile 형식 검증

## 검증 규칙

### API

- `title`: NotBlank, max=200
- `description`: max=1000
- `category`: WORK/PERSONAL/STUDY/null
- `priority`: LOW/MEDIUM/HIGH

### UI

- `title` maxLength={200}
- `description` maxLength={1000}

### Docker

- 첫 줄: `FROM`으로 시작
- `WORKDIR` 필수
- `CMD` 또는 `ENTRYPOINT` 필수
