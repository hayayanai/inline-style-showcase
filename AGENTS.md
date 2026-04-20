# AGENTS.md

This repository contains `inline-style-showcase`, an Astro-based showcase of inline CSS effects for Markdown HTML.

## Project Overview

- Effects must work using inline `style=""` attributes only
- No `<style>` tags or `<script>` inside effect snippets
- The project publishes only effects that were retained after overlap review
- When adding new effects, avoid names or concepts that closely mirror existing third-party effect libraries

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build
- `pnpm lint` — Run oxlint
- `pnpm lint:fix` — Run oxlint with auto-fix
- `pnpm format` — Format with Prettier

## Architecture

- `src/effects/<category>/*.astro` — Effect modules
- `src/lib/effects.ts` — Central effect discovery via `import.meta.glob`
- `src/pages/` — Static pages and dynamic effect routes
- `src/components/` — Shared UI such as preview, search, copy, and customization
- `src/layouts/MainLayout.astro` — Shared layout

## Adding a New Effect

- Create a PascalCase `.astro` file under the appropriate `src/effects/<category>/` directory
- Export `meta` and `code`
- Export `props` and `codeTemplate` when customization is needed
- Keep all labels and descriptions in English
- Prefer broadly generic concepts and avoid anything that reads like a direct port of an existing third-party component
