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
