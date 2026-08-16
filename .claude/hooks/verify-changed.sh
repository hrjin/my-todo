#!/usr/bin/env bash
# Stop hook: 변경된 영역에 대해서만 타입체크/린트/컴파일을 실행한다.
# 실패하면 exit 2로 종료해 에이전트에게 결과를 되돌려준다.
#
# JDK 21 경로는 JAVA_HOME_21 로 재정의할 수 있다 (미설정 시 아래 기본값 사용).

set -u

stdin_payload="$(cat 2>/dev/null || true)"

# 훅이 되돌린 피드백으로 다시 실행되는 무한루프 방지
case "$stdin_payload" in
*'"stop_hook_active"'*[Tt]rue*) exit 0 ;;
esac

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

changed="$(git status --porcelain 2>/dev/null | cut -c4-)"
[ -z "$changed" ] && exit 0

touched() { printf '%s\n' "$changed" | grep -q "^$1"; }

failures=""
record() { failures="${failures}
--- $1 ---
$2"; }

if touched 'ui/' && [ -d ui/node_modules ]; then
  if ! out="$(cd ui && npx tsc -b 2>&1)"; then
    record "ui: tsc (타입체크)" "$out"
  fi
  if ! out="$(cd ui && npx eslint . 2>&1)"; then
    record "ui: eslint" "$out"
  fi
fi

if touched 'api/'; then
  export JAVA_HOME="${JAVA_HOME_21:-/d/Workspace/java}"
  if ! out="$(cd api && ./mvnw.cmd -q -o test-compile 2>&1)"; then
    record "api: 컴파일" "$out"
  fi
fi

if [ -n "$failures" ]; then
  printf '검증 실패 — 응답 전에 아래를 수정할 것:%s\n' "$failures" >&2
  exit 2
fi

exit 0
