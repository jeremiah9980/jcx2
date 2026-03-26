# JC² Love Site

A dedicated GitHub Pages microsite for **Jesica + Jere** inside the `jcx2` repository.

## Expected URL

Once GitHub Pages finishes serving the new files, this path should work:

`https://jeremiah9980.github.io/jcx2/love/`

## Files added

- `love/index.html`
- `love/styles.css`
- `love/assets/js/content.js`
- `love/assets/media/README.md`

## How to customize the story quickly

Edit:

`love/assets/js/content.js`

That file controls:

- story paragraphs
- timeline milestones
- photo gallery cards
- video gallery cards

## How to add real wedding photos

1. Upload image files into:

`love/assets/media/`

2. Replace the placeholder photo cards in `content.js` with your real filenames.
3. If you want actual image rendering instead of the current elegant placeholders, update the gallery cards in `index.html` or swap the JS renderer to output `<img>` tags.

## How to add personal videos

Put MP4 files into:

`love/assets/media/`

Then either:

- link them in `content.js`, or
- replace a video placeholder card with a real `<video controls>` element

## How to embed Instagram

In `love/index.html`, find the **Instagram integration** section.

Replace the placeholder block with your actual embed snippet or feed widget code.

Example placeholder block:

```html
<!-- Paste Instagram or feed widget embed code here -->
```

## Easy next upgrades

- anniversary countdown
- private vows page
- songs / playlist section
- travel map
- full wedding gallery page
- guest messages / notes