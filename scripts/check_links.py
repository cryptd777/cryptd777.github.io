
#!/usr/bin/env python3
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
html_files = [
    root/'index.html',
    root/'projects.html',
    root/'about.html',
    root/'contact.html',
    root/'projects/cryptowser/index.html',
    root/'projects/linuxcloudsync/index.html',
    root/'projects/proxymaster/index.html',
]

errors = []

for path in html_files:
    text = path.read_text()
    for href in re.findall(r'href="(.*?)"', text):
        if href.startswith('http') or href.startswith('mailto'):
            continue
        if href.startswith('#'):
            continue
        # resolve local
        target = (path.parent / href.split('?')[0]).resolve()
        if not target.exists():
            errors.append(f"{path}: missing link target {href}")

if errors:
    print('Link checks failed:')
    for e in errors:
        print(' -', e)
    raise SystemExit(1)

print('Link checks passed.')
