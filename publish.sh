#!/usr/bin/env bash
set -euo pipefail

repo="/home/anas/github/cryptd777.github.io"
do_push=false

if [ "${1-}" = "--push" ]; then
  do_push=true
fi

if [ ! -d "$repo/.git" ]; then
  echo "Error: $repo is not a git repo." >&2
  exit 1
fi

git -C "$repo" add .

git -C "$repo" commit -m "Linux-style refresh and project updates" || {
  echo "No changes to commit."
  exit 0
}

if [ "$do_push" = true ]; then
  git -C "$repo" push -u origin main
else
  echo "Commit created. Push manually if you want to publish:" \
    "git -C $repo push -u origin main"
fi
