# cryptd777.github.io

Project shutdown notice and archive site for cryptd777. All previous pages now redirect to `shutdown.html`.

## Structure

- `shutdown.html` (primary closure notice)
- `index.html` (redirect)
- `projects.html` (redirect)
- `about.html` (redirect)
- `contact.html` (redirect)
- `projects/` (redirect stubs)
- `styles.css` (archived theme)
- `assets/` (icons + OG assets)
- `amp/` (legacy AMP redirects)

## Design System

- Dark archive theme
- Semantic HTML5
- Shared stylesheet (`styles.css`)
- No external CSS frameworks or JS libraries

## Recent Changes

- Added `shutdown.html` as the primary closure notice.
- Redirected all site pages to the shutdown notice.
- Updated the theme to a somber archive aesthetic.
- Revised AMP pages to redirect to the shutdown notice.

## Local Preview

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/shutdown.html`

## Tests

```bash
bash scripts/test.sh
```

## Notes

- AMP pages now function as redirect stubs.
- `skills/` is ignored via `.gitignore` and is not intended for publishing.
