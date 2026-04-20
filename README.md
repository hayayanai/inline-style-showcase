# inline-style-showcase

A curated collection of copy-paste inline CSS effects for Markdown HTML.

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE.md)

## Documentation

Visit [inline-style-showcase](https://hayayanai.github.io/inline-style-showcase/) to browse the live previews.

## About

inline-style-showcase is a showcase of inline CSS effects that work solely via `style=""` attributes — no `<style>` tags or `<script>` needed.

Every effect is designed to be copied and pasted directly into Markdown HTML, making it useful for README files, GitHub Pages, blog posts, and anywhere that supports inline HTML.

This project intentionally publishes only the effects retained after overlap review, with close conceptual overlaps removed for safety.

## Key Features

- **47 Effects** — Text effects, backgrounds, and UI components across 3 categories
- **Copy & Paste** — Just copy an effect and paste it into your HTML
- **Zero Dependencies** — Everything works with just the `style=""` attribute
- **Customizable** — Tweak colors, sizes, and values directly in the inline styles

## Usage

Browse the [documentation site](https://hayayanai.github.io/inline-style-showcase/), find an effect you like, and copy the code:

```html
<span
  style="color:#0ff;text-shadow:0 0 7px #0ff,0 0 10px #0ff,0 0 21px #0ff,0 0 42px #0ff"
>
  Neon Glow
</span>
```

Paste it into any Markdown file or HTML document.

## Development Commands

- `pnpm dev` — Start local dev server
- `pnpm build` — Build static site
- `pnpm lint` — Run oxlint
- `pnpm format` — Format the repository with Prettier
- `pnpm format:check` — Check formatting in CI/local

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request after verifying the new effect follows the repository constraints and avoids close upstream overlap.
