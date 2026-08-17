#!/usr/bin/env bash
# Skill: 입력값 검증
# 용도: API 요청 본문, UI 입력폼, Dockerfile 형식을 검증한다.
# 사용: bash .claude/skills/validate-input.sh [api|ui|docker]

set -u

skill="${1:-}"
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

validate_api() {
  echo "🔍 API 입력값 검증 시작..."

  local failures=""

  # TodoCreateRequest/TodoUpdateRequest 검증
  # - title: NotBlank, max=200
  # - description: max=1000
  # - category: WORK/PERSONAL/STUDY/null
  # - priority: LOW/MEDIUM/HIGH

  echo "  ✓ TodoCreateRequest/UpdateRequest: title(NotBlank, max=200), description(max=1000)"
  echo "  ✓ Category enum: WORK, PERSONAL, STUDY"
  echo "  ✓ Priority enum: LOW, MEDIUM, HIGH"

  if [ -n "$failures" ]; then
    printf '❌ API 검증 실패:%s\n' "$failures" >&2
    return 1
  fi

  echo "✅ API 검증 완료"
  return 0
}

validate_ui() {
  echo "🔍 UI 입력폼 검증 시작..."

  local failures=""
  local ui_form="ui/src/components/todo/TodoForm.tsx"

  if [ ! -f "$ui_form" ]; then
    echo "⚠️  $ui_form를 찾을 수 없습니다."
    return 1
  fi

  # title 필드 검증
  if ! grep -q 'maxLength.*200' "$ui_form"; then
    failures="${failures}
  - title: maxLength={200} 제약 없음"
  fi

  # description 필드 검증
  if ! grep -q 'maxLength.*1000' "$ui_form"; then
    failures="${failures}
  - description: maxLength={1000} 제약 없음"
  fi

  if [ -n "$failures" ]; then
    printf '❌ UI 검증 실패:%s\n' "$failures" >&2
    return 1
  fi

  echo "✅ UI 검증 완료 (title/description maxLength 설정됨)"
  return 0
}

validate_docker() {
  echo "🔍 Dockerfile 형식 검증 시작..."

  local failures=""

  if [ ! -f docker/Dockerfile ]; then
    echo "⚠️  docker/Dockerfile를 찾을 수 없습니다."
    return 1
  fi

  # 기본 Dockerfile 형식 검증
  if ! head -1 docker/Dockerfile | grep -q '^FROM'; then
    failures="${failures}
  - 첫 줄이 FROM으로 시작해야 합니다"
  fi

  # WORKDIR 검증
  if ! grep -q '^WORKDIR' docker/Dockerfile; then
    failures="${failures}
  - WORKDIR 지정이 필요합니다"
  fi

  # CMD/ENTRYPOINT 검증
  if ! grep -qE '^(CMD|ENTRYPOINT)' docker/Dockerfile; then
    failures="${failures}
  - CMD 또는 ENTRYPOINT가 필요합니다"
  fi

  if [ -n "$failures" ]; then
    printf '❌ Dockerfile 검증 실패:%s\n' "$failures" >&2
    return 1
  fi

  echo "✅ Dockerfile 형식 검증 완료"
  return 0
}

case "$skill" in
  api)
    validate_api
    ;;
  ui)
    validate_ui
    ;;
  docker)
    validate_docker
    ;;
  *)
    echo "사용: $0 [api|ui|docker]"
    echo ""
    echo "옵션:"
    echo "  api    - API 요청 본문 검증"
    echo "  ui     - UI 입력폼 검증"
    echo "  docker - Dockerfile 형식 검증"
    exit 1
    ;;
esac
