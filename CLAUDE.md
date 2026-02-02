# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Columbia University Africa Alumni (CU-AA)** - A modern web application for the CU-AA community.
This project has been migrated from a Jekyll static site to a **Next.js** application to support rich interactive features (Directory, Auth, Member Area).

**Stack:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Auth & Database:** Supabase
- **Styling:** Vanilla CSS (CSS Modules + Global CSS variables)
- **Deployment:** Netlify (Target)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev      # http://localhost:3000

# Build for production
npm run build
npm start

# Linting
npm run lint
```

## Architecture

- **`src/app/`**: App Router pages and layouts.
- **`src/app/auth/`**: Server Actions for authentication.
- **`src/utils/supabase/`**: Supabase Client & Server utilities.
- **`components/`**: Reusable React components.
- **`public/assets/`**: Static assets (images, icons).
- **`legacy_jekyll/`**: Archive of the previous Jekyll site (Reference only).

## Supabase Setup (Important)

To run this locally, you must set up a Supabase project:
1. Go to [supabase.com](https://supabase.com) and create a project.
2. In the SQL Editor, run the contents of `supabase_setup.sql`.
3. Copy the URL and ANON KEY to a new file: `.env.local` (see `.env.local.example`).

## Styling Guidelines

- **Global Styles:** `src/app/globals.css` contains the design system (Variables, Typography, Buttons).
- **CSS Modules:** Use `*.module.css` for component-specific styles.
- **Brand Colors:**
  - Blue: `var(--columbia-blue)`
  - Light Blue: `var(--columbia-light-blue)`
  - Red: `var(--accent-red)`

## Migration Status

- **Phase 1 (Done):** Scaffolding Next.js, migrating Global CSS.
- **Phase 2 (Done):** Integrate Supabase (Auth + Profiles).
- **Phase 3 (Done):** Implement Navbar, Footer, and basic Pages.
- **Phase 4 (Done):** Re-implement "Directory".
- **Phase 5 (TODO):** Re-implement "Streams" pages.
