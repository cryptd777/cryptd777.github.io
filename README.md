# cryptd777.github.io

Light‑mode, card‑based portfolio site for cryptd777 with AMP equivalents.

## Pages

- `index.html`
- `projects.html`
- `about.html`
- `contact.html`
- `projects/cryptowser/index.html`
- `projects/linuxcloudsync/index.html`

AMP versions live under `amp/` with matching paths.

## Design System

- Light mode only
- Card‑based layout
- Semantic HTML5
- Self‑contained CSS in each HTML file
- No external CSS frameworks or JS libraries

## Local Preview

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/amp/index.html`

If you hit caching issues, add a cache buster:

- `http://localhost:8000/index.html?v=1`

## Notes

- AMP pages use a stricter CSS subset and avoid unsupported effects.
- `skills/` is ignored via `.gitignore` and is not intended for publishing.
