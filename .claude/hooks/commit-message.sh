#!/usr/bin/env bash
# Prepare-commit-msg hook: 커밋 메시지 검증
# - 메시지는 10자 이상이어야 합니다.
# - 빈 줄은 무시됩니다 (merge commit 등).

set -u

commit_msg_file="$1"
commit_source="${2:-}"

# merge/squash 커밋은 검증 스킵
case "$commit_source" in
  merge|squash|commit) exit 0 ;;
esac

commit_msg="$(head -1 "$commit_msg_file" 2>/dev/null | sed 's/^#.*//' | xargs)"

# 빈 메시지는 통과 (다른 훅이 처리)
if [ -z "$commit_msg" ]; then
  exit 0
fi

msg_length="${#commit_msg}"

if [ "$msg_length" -lt 10 ]; then
  cat >&2 <<EOF
❌ 커밋 메시지 검증 실패

현재 메시지: "$commit_msg"
길이: $msg_length자 (최소 10자 필요)

예시:
  ✓ "API 엔드포인트 추가"
  ✓ "UI 입력폼 제약조건 추가"
  ✗ "추가" (너무 짧음)
  ✗ "a" (너무 짧음)
EOF
  exit 1
fi

exit 0
