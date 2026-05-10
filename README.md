# Secondary AI Review Package

This package is organized for:
- secondary AI review
- attorney review
- mediation prep
- chronology verification

## Repository structure

```
jcx2/
├── index.html                   # Main entry point for the HTML site
├── styles.css                   # Global stylesheet
├── *.html                       # Individual analysis/profile pages
├── analysis/                    # Markdown analysis documents
├── assets/                      # Images, JS, and other static assets
├── datasets/                    # Structured CSV/JS datasets
├── site/                        # Alternate HTML site build
├── templates/                   # Manual extraction templates
└── timelines/                   # Timeline CSV files
```

## Viewing the site locally

Because several pages use root-relative asset paths (e.g. `/jcx2/assets/…`),
the easiest way to preview the site is via a simple local HTTP server.

### Using Python (no install needed)

```bash
# Python 3
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```

### Using Node.js / npx

```bash
npx serve .
# then follow the URL printed in the terminal
```

### Using VS Code

Install the **Live Server** extension, right-click `index.html`, and choose
*Open with Live Server*.

## Development notes

| Concern | Guidance |
|---------|----------|
| HTML formatting | Keep 2-space indentation; see `.editorconfig` |
| Markdown docs | Files in `analysis/` must pass `markdownlint` (CI checks this) |
| Links | Internal and external links are validated in CI via `lychee` |
| New pages | Add a `<link rel="stylesheet" href="styles.css">` and the shared `<nav>` |

## CI checks (GitHub Actions)

Two workflows run automatically on every pull request and push to `main`:

1. **Markdown lint** – ensures consistent formatting in all `.md` files.
2. **Link check** – scans all HTML and Markdown files for broken links.

## Recommended review workflow

1. Review `analysis/package_manifest.md`
2. Load `datasets/appclose_structured_message_dataset.csv`
3. Load the timeline CSVs in `timelines/`
4. Review `analysis/communication_behavior_classification.md`
5. Use the site in `site/` for human-readable navigation

## Important note

Per-message structured datasets for Jesica↔Sharon and Jesica↔Stephanie are not
fully extracted here. Templates are included in `templates/` for consistent
manual completion or future OCR reconstruction.
