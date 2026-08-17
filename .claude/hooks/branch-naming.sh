#!/usr/bin/env bash
# Update-ref hook: 브랜치 네이밍 컨벤션 검증
# 허용되는 브랜치 패턴:
#   - feature/*    : 기능 추가
#   - fix/*        : 버그 수정
#   - refactor/*   : 리팩토링
#   - test/*       : 테스트 추가/개선
#   - main         : 메인 브랜치
#   - develop      : 개발 브랜치 (옵션)

set -u

ref_name="$1"
old_sha="$2"
new_sha="$3"

# main 브랜치는 항상 허용
[ "$ref_name" = "refs/heads/main" ] && exit 0
[ "$ref_name" = "refs/heads/develop" ] && exit 0

# refs/heads/ 제거해서 브랜치명만 추출
branch_name="${ref_name#refs/heads/}"

# 허용되는 패턴 확인
if echo "$branch_name" | grep -qE '^(feature|fix|refactor|test)/'; then
  exit 0
fi

# 검증 실패
cat >&2 <<EOF
❌ 브랜치 네이밍 검증 실패

현재 브랜치: $branch_name

허용되는 패턴:
  ✓ feature/*   - 기능 추가 (feature/user-auth, feature/todo-filter)
  ✓ fix/*       - 버그 수정 (fix/layout-bug, fix/api-error)
  ✓ refactor/*  - 리팩토링 (refactor/components, refactor/hooks)
  ✓ test/*      - 테스트 (test/todo-form, test/api-validation)
  ✓ main        - 메인 브랜치
  ✓ develop     - 개발 브랜치

예시 - 좋은 브랜치명:
  feature/add-priority-filter
  fix/memory-leak
  refactor/extract-components
  test/add-integration-tests
EOF
exit 1
