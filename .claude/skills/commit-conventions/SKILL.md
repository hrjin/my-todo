---
description: 커밋 메시지와 브랜치 네이밍 컨벤션을 검증합니다.
---

# Commit Conventions Skill

프로젝트의 커밋 메시지와 브랜치 네이밍 규칙을 검증하는 Hook Skill입니다.

## 자동 실행

`.claude/hooks.json`의 훅에 의해 자동으로 실행됩니다:
- **pre-commit** — `git commit` 시 커밋 메시지 검증
- **pre-push** — `git push` 시 브랜치 네이밍 검증

## 커밋 메시지 규칙

- **최소 길이**: 10자 이상
- **제외**: merge commit, squash commit 등은 검증 스킵
- **예시**:
  - ✓ "API 엔드포인트 추가"
  - ✓ "UI 입력폼 제약조건 추가"
  - ✗ "추가" (너무 짧음)

## 브랜치 네이밍 규칙

허용되는 패턴:
- `feature/*` — 기능 추가
- `fix/*` — 버그 수정
- `refactor/*` — 리팩토링
- `test/*` — 테스트 추가/개선
- `main` — 메인 브랜치
- `develop` — 개발 브랜치 (옵션)

**좋은 브랜치명 예시**:
- `feature/add-priority-filter`
- `fix/memory-leak`
- `refactor/extract-components`
- `test/add-integration-tests`

## 실패 시

- Exit code 1로 종료
- 상세한 오류 메시지 출력
- 커밋/푸시가 차단됨

## 수동 실행 (선택사항)

```bash
# 커밋 메시지 검증
bash .claude/skills/commit-conventions/scripts/check-commit-msg.sh

# 브랜치 네이밍 검증
bash .claude/skills/commit-conventions/scripts/check-branch-naming.sh
```
