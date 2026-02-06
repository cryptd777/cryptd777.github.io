
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
    if not path.exists():
        errors.append(f"missing file: {path}")
        continue
    text = path.read_text()
    if text.count('<main') != 1:
        errors.append(f"{path}: expected 1 <main>, found {text.count('<main')}")
    if '<style>' in text:
        errors.append(f"{path}: inline <style> found (should be external styles.css)")
    if 'styles.css' not in text:
        errors.append(f"{path}: missing styles.css link")
    if not re.search(r'<title>.*</title>', text):
        errors.append(f"{path}: missing <title>")

if errors:
    print('HTML sanity checks failed:')
    for e in errors:
        print(' -', e)
    raise SystemExit(1)

print('HTML sanity checks passed.')
