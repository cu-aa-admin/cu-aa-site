# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Columbia University Africa Alumni (CU-AA)** - A modern web application for the CU-AA community.
This project has been migrated from a Jekyll static site to a **Next.js** application to support rich interactive features (Directory, Auth, Member Area).

**Stack:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Auth:** Clerk
- **Database:** Supabase (for extended user profiles and app data)
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
- **`src/middleware.ts`**: Clerk authentication middleware.
- **`src/utils/supabase/`**: Supabase Client & Server utilities.
- **`components/`**: Reusable React components.
- **`public/assets/`**: Static assets (images, icons).
- **`legacy_jekyll/`**: Archive of the previous Jekyll site (Reference only).

## Clerk Setup (Authentication)

Clerk handles all authentication (sign-up, sign-in, session management).

1. Go to [clerk.com](https://clerk.com) and create an application.
2. Copy the publishable key and secret key to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   ```
3. Configure sign-in/sign-up URLs in `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

## Supabase Setup (Database)

Supabase stores extended user profiles and application data not managed by Clerk.

1. Go to [supabase.com](https://supabase.com) and create a project.
2. In the SQL Editor, run the contents of `supabase_setup.sql`.
3. Copy the URL and ANON KEY to `.env.local` (see `.env.local.example`).

**Note:** User profiles in Supabase are linked to Clerk users via `clerk_user_id`.

## Styling Guidelines

- **Global Styles:** `src/app/globals.css` contains the design system (Variables, Typography, Buttons).
- **CSS Modules:** Use `*.module.css` for component-specific styles.
- **Brand Colors:**
  - Blue: `var(--columbia-blue)`
  - Light Blue: `var(--columbia-light-blue)`
  - Red: `var(--accent-red)`

## Migration Status

- **Phase 1 (Done):** Scaffolding Next.js, migrating Global CSS.
- **Phase 2 (Done):** Integrate Supabase for database.
- **Phase 3 (Done):** Implement Navbar, Footer, and basic Pages.
- **Phase 4 (Done):** Re-implement "Directory".
- **Phase 5 (Done):** Migrate auth from Supabase Auth to Clerk.
- **Phase 6 (TODO):** Re-implement "Streams" pages.
