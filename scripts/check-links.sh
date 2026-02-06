#!/usr/bin/env bash
set -euo pipefail

root_dir="${1:-.}"

html_files=$(find "$root_dir" -type f -name "*.html")

if [ -z "$html_files" ]; then
  echo "No HTML files found."
  exit 0
fi

echo "Scanning HTML files..."

declare -A checked
status=0

check_url() {
  local url="$1"
  local base_dir="$2"
  if [[ -n "${checked[$url]:-}" ]]; then
    return
  fi
  checked[$url]=1

  if [[ "$url" == https://fonts.googleapis.com || "$url" == https://fonts.gstatic.com || "$url" == https://fonts.googleapis.com/ || "$url" == https://fonts.gstatic.com/ ]]; then
    echo "SKIP: $url"
    return
  fi

  if [[ "$url" == http://* || "$url" == https://* ]]; then
    local code
    code=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 8 --connect-timeout 5 "$url" || echo "000")
    if [[ "$code" == "000" || "$code" -ge 400 ]]; then
      echo "BROKEN (HTTP $code): $url"
      status=1
    else
      echo "OK (HTTP $code): $url"
    fi
    return
  fi

  if [[ "$url" == mailto:* || "$url" == tel:* || "$url" == \#* ]]; then
    echo "SKIP: $url"
    return
  fi

  local clean_url="${url%%#*}"
  local file_path
  if [[ "$clean_url" == /* ]]; then
    file_path="$root_dir$clean_url"
  else
    file_path="$base_dir/$clean_url"
  fi
  file_path=$(realpath -m "$file_path")
  if [ -f "$file_path" ]; then
    echo "OK (file): $url"
  else
    echo "BROKEN (file): $url"
    status=1
  fi
}

while IFS= read -r file; do
  echo "\n$file"
  urls=$(grep -oE '(href|src)="[^"]+"' "$file" | sed -E 's/(href|src)="([^"]+)"/\2/' | sort -u)
  base_dir=$(dirname "$file")
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    check_url "$url" "$base_dir"
  done <<< "$urls"
done <<< "$html_files"

exit $status
