#!/usr/bin/env bash
set -euo pipefail

if ! command -v dot >/dev/null 2>&1; then
  echo "Graphviz 'dot' is required to render diagrams." >&2
  exit 1
fi

for source in diagrams/*.dot; do
  target="${source%.dot}.svg"
  echo "Rendering ${source} -> ${target}"
  dot -Tsvg "$source" -o "$target"
done
