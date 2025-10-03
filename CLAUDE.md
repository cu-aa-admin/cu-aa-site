# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Jekyll-based static website** for Columbia University Africa Alumni (CU-AA) - a community platform for Columbia graduates focused on African development discussions, mentorship programs, and alumni networking. The site is deployed on Netlify and integrates with Discord for real-time community chat and Giscus for GitHub-backed discussions.

**NOT YET LIVE** - Still in development phase.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

The site will be available at `http://localhost:4000`. Jekyll watches for file changes and rebuilds automatically (except `_config.yml` - requires server restart).

### Deployment

Deployment happens automatically via Netlify when pushing to the `main` branch.
- Build command: `bundle exec jekyll build`
- Publish directory: `_site`

## Architecture & Key Concepts

### Content Structure

**Jekyll Collections & Categories:**
- `_posts/` - Blog posts/discussion threads (currently empty - needs seed content)
- `_programs/` - Custom collection for program pages (mentorship, leadership, etc.)
- Categories filter posts: `economics`, `technology`, `education`, `healthcare`, `policy`, `climate`

**Page Types:**
- **Stream pages** (`/streams/`) - Topic-specific discussion hubs that aggregate posts by category and link to Discord channels
- **Member pages** (`/members/`) - Protected area for authenticated alumni (dashboard, directory, profile, opportunities)
- **Program pages** (`/programs/`) - Static informational pages about CU-AA initiatives

### Templating System

**Layouts** (`_layouts/`):
- `default.html` - Base template with header, footer, Giscus discussions, Google Analytics placeholder
- `post.html` - Blog post wrapper (minimal, extends default)
- `page.html` - Generic page wrapper

**Includes** (`_includes/`):
- `header.html` - Navigation with dropdown menus, mobile hamburger, client-side auth state (localStorage-based)
- `footer.html` - Social links, newsletter form (no backend yet), quick links
- `giscus.html` - GitHub Discussions integration (repo: ESGmichaelNY/cu-aa-site)
- `chat.html` - Discord widget embed (optional, controlled by `chat_room:` front matter)

### Authentication & Authorization

**Current Implementation (Insecure - Needs Replacement):**
- Client-side only using `localStorage.getItem('cuaa_user')`
- No actual authentication flow implemented
- Header shows/hides nav items based on localStorage state
- **TODO:** Replace with proper JWT/OAuth before launch

**Discord Integration:**
- Server ID: `1393296489295384726`
- Invite code: `2h2HgWFJ`
- Used for real-time community discussions in topic-specific channels

### Styling & Branding

**Design System:**
- Primary colors defined in `/assets/css/custom.css`:
  - Columbia Blue: `#002E6D`
  - Columbia Light Blue: `#6CACE4`
  - Accent Red: `#EE1848`
- Font: Inter (Google Fonts)
- Responsive breakpoint: 768px
- Africa continent SVG silhouette used as decorative background element

**Key CSS Features:**
- All page-specific styles are inline in markdown files (not ideal for production)
- Navigation has dropdown support for multi-level menus
- Mobile-first responsive approach

### Forms & Data Submission

**Blog Submission Flow:**
1. User submits via contact form or dedicated submission form
2. Netlify Function (`/netlify/functions/submit-blog-post.js`) sends email via nodemailer
3. Admin manually creates post file in `_posts/` using admin dashboard (`/admin/`)
4. Admin dashboard generates properly formatted frontmatter and filename

**Newsletter Form:**
- Footer has newsletter signup pointing to `/subscribe` (no handler implemented)

### Configuration Architecture

**`_config.yml` Critical Settings:**
- `navigation:` - Defines main nav structure (supports nested dropdowns)
- `member_pages:` - Auth-required pages shown via JavaScript
- `discord:` - Server credentials and widget settings
- `collections:` - Defines `_programs/` collection with custom permalink
- `defaults:` - Auto-applies layouts to posts/programs

**Environment:**
- `.env` file exists (should be gitignored - currently tracked!)
- Netlify environment variables needed for email functions

### Content Management

**Manual Workflow (Current):**
1. Blog submissions arrive via email (Netlify Function)
2. Admin uses `/admin/` dashboard to:
   - View submission
   - Generate formatted markdown with proper frontmatter
   - Copy generated content
3. Admin creates new file in `_posts/YYYY-MM-DD-slug.markdown` via GitHub or locally
4. Git commit triggers Netlify rebuild

**Netlify CMS (Planned but not configured):**
- OAuth provider code exists in `netlify-cms-oauth-provider-node/` but not integrated

## Important Patterns & Conventions

### Post Frontmatter Format
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
author: "Name (Class Year)"
categories: [economics|technology|education|healthcare|policy|climate]
---
```

### Creating New Stream Pages
Streams follow pattern in `/streams/economics.md`:
- Aggregate posts by category: `{% for post in site.categories.economics %}`
- Include Discord channel CTA with invite link
- List discussion topics and contribution guidelines

### Member Area Protection
Member pages check auth client-side but have **NO server-side protection**. Pages are publicly accessible URLs - only UI elements are hidden.

### Navigation Dropdowns
Defined in `_config.yml` with nested structure:
```yaml
navigation:
  - title: Programs
    dropdown:
      - title: Mentorship Program
        url: /programs/mentorship/
```

## Critical Files Reference

- `_config.yml` - Site-wide configuration, navigation, social links, Discord settings
- `_layouts/default.html` - Meta tags, analytics, global layout wrapper
- `_includes/header.html` - Navigation and authentication UI logic
- `/assets/css/custom.css` - Design system and base styles
- `/admin/index.html` - Post generation tool for moderators
- `netlify.toml` - Deployment configuration
- `Gemfile` - Ruby dependencies (Jekyll 4.4.1, SEO/sitemap plugins)

## Common Development Tasks

### Adding a New Blog Post
Create file: `_posts/YYYY-MM-DD-title-slug.markdown`
```markdown
---
layout: post
title: "Your Title"
date: 2025-10-03
author: "Name (CC '15)"
categories: economics
---

Your content here...
```

### Adding a New Program
Create file: `_programs/program-name.md` (auto-routes to `/programs/program-name/`)

### Modifying Navigation
Edit `_config.yml` under `navigation:` array, then restart Jekyll server.

## Known Issues & TODOs

1. **Authentication is client-side only** - Insecure, needs proper implementation
2. **No actual blog posts exist** - `_posts/` is empty
3. **Member area pages are stubs** - Need real functionality
4. **Missing images** - OG image, favicons referenced but some may not exist
5. **Newsletter form has no backend** - Form action `/subscribe` not implemented
6. **Contact form needs backend** - Only Netlify Function exists, form UI needed
7. **`.env` is tracked in git** - Security issue, should be gitignored
8. **Google Analytics not configured** - Template ready but no tracking ID
9. **Many inline styles** - Should be moved to CSS files for maintainability
10. **No error handling** - Forms, auth, API calls lack error states

## Repository Information

- **GitHub Repo:** ESGmichaelNY/cu-aa-site
- **Main Branch:** main
- **Giscus Discussions:** Enabled under "Website Discussions" category
- **Discord Server:** https://discord.gg/2h2HgWFJ

## Data Flow Diagrams

**Discussion/Comment System:**
User visits post → Giscus widget loads → Comments stored in GitHub Discussions → Displayed via Giscus client

**Blog Submission (Current):**
User fills form → Netlify Function emails admin → Admin uses /admin/ dashboard → Manual git commit → Site rebuilds

**Authentication (Current - Broken):**
Login page (not implemented) → Sets localStorage → Header reads localStorage → Shows/hides nav items (client-side only, no security)
