#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_BRANCH="${BUILD_BRANCH:-build}"
STAGING="$ROOT/.deploy-staging"
WORKTREE="$ROOT/.deploy-worktree"

cd "$ROOT"

echo "→ Building production bundle..."
pnpm build

STANDALONE="$ROOT/.next/standalone"
if [[ ! -d "$STANDALONE" ]]; then
  echo "Error: .next/standalone not found. Ensure output: 'standalone' is set in next.config.js." >&2
  exit 1
fi

echo "→ Preparing deploy staging directory..."
rm -rf "$STAGING"
mkdir -p "$STAGING"
cp -R "$STANDALONE/." "$STAGING/"
mkdir -p "$STAGING/.next/static"
cp -R "$ROOT/.next/static/." "$STAGING/.next/static/"
cp -R "$ROOT/public/." "$STAGING/public/"

if [[ -f "$ROOT/.env" ]]; then
  cp "$ROOT/.env" "$STAGING/.env"
fi

cat > "$STAGING/README.deploy.md" <<'EOF'
# TakeMeLive production deploy

This branch contains only the Next.js standalone build — no source code.

## First deploy on the server

```bash
git clone --branch build --depth 1 <repo-url> takemelive
cd takemelive
PORT=3000 node server.js
```

## Update an existing deploy

```bash
cd takemelive
git fetch origin build
git reset --hard origin/build
PORT=3000 node server.js
```

Set `PORT` and any env vars your app needs (see `.env` if present).
EOF

echo "→ Publishing to branch: $BUILD_BRANCH (build artifacts only)"
rm -rf "$WORKTREE"
mkdir -p "$WORKTREE"

rsync -a --delete "$STAGING/" "$WORKTREE/"

(
  cd "$WORKTREE"
  git init -b "$BUILD_BRANCH"
  git add -A
  git commit -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git remote add origin "$(git -C "$ROOT" remote get-url origin)"
  git push -f origin "$BUILD_BRANCH"
)

rm -rf "$STAGING" "$WORKTREE"

DEPLOY_SIZE="$(du -sh "$ROOT/.next/standalone" | cut -f1)"
echo "✓ Pushed to origin/$BUILD_BRANCH (~${DEPLOY_SIZE} standalone bundle)"
echo "  Server: git clone --branch $BUILD_BRANCH --depth 1 <repo-url> && cd takemelive && PORT=3000 node server.js"
