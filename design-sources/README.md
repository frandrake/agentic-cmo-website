# design-sources

High-resolution originals kept under version control but **deliberately outside `public/`** so they
are not copied into `dist/` and shipped to visitors.

- `author.png` — full-resolution author portrait. The web copy `public/assets/author.jpg` (and the
  1200x630 card `public/assets/og/author.jpg`) are derived from it. Regenerate the optimised
  assets with `sharp` if the portrait changes.
- `hero-image.png` — an unused hero concept (no page references it). Parked here rather than deleted;
  remove it if it is genuinely not wanted.

These files are not served. Editing them has no effect on the live site until the derived assets in
`public/assets/` are regenerated.
