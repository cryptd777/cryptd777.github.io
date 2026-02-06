#!/usr/bin/env bash
set -euo pipefail
python3 scripts/check_html.py
python3 scripts/check_links.py
python3 scripts/check_sitemap.py
