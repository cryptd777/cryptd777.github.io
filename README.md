# cryptd777.github.io

Light‑mode, card‑based portfolio site for cryptd777. The non‑AMP site is the primary focus.

## Structure

- `index.html` (home)
- `projects.html` (projects overview)
- `about.html` (background + philosophy)
- `contact.html` (contact + collaboration)
- `projects/cryptowser/index.html`
- `projects/linuxcloudsync/index.html`
- `projects/proxymaster/index.html`
- `styles.css` (shared design system)
- `assets/` (icons + OG assets)
- `amp/` (legacy AMP equivalents)

## Design System

- Light mode only
- Card‑based layout
- Semantic HTML5
- Shared stylesheet (`styles.css`)
- No external CSS frameworks or JS libraries

## Recent Changes

- Promoted **LinuxCloudSync** as the flagship project across home and projects pages.
- Added “Coming Soon” project cards to highlight upcoming work.
- Added open‑source philosophy section to `about.html`.
- Cleaned up layout spacing and grid classes for consistent card gaps.
- Fixed a media query parsing bug in `styles.css` that could break layout.

## How It Works

- All pages share `styles.css` for consistent spacing, typography, and cards.
- Grids use `grid grid-2` and `grid grid-3` classes for responsive columns.
- `.section` provides vertical rhythm between blocks.

## Local Preview

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`

If you hit caching issues, add a cache buster:

- `http://localhost:8000/index.html?v=1`

## Tests

```bash
bash scripts/test.sh
```

## Notes

- AMP pages use a stricter CSS subset and avoid unsupported effects.
- `skills/` is ignored via `.gitignore` and is not intended for publishing.
