
#!/usr/bin/env python3
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
sitemap = root/'sitemap.xml'
if not sitemap.exists():
    raise SystemExit('sitemap.xml missing')

text = sitemap.read_text()
urls = re.findall(r'<loc>(.*?)</loc>', text)
missing = []
for url in urls:
    if 'https://cryptd777.github.io/' in url:
        path = url.replace('https://cryptd777.github.io/', '')
        if not path:
            path = 'index.html'
    else:
        continue
    local = (root / path).resolve()
    if not local.exists():
        missing.append(path)

if missing:
    print('Sitemap missing files:')
    for m in missing:
        print(' -', m)
    raise SystemExit(1)

print('Sitemap checks passed.')
