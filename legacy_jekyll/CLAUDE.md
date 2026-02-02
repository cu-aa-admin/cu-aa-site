# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jekyll-based static website for Columbia University Africa Alumni (CU-AA) - a community platform bringing together 90+ Columbia graduates working on African development. Features discussion streams, member directory, mentorship programs, and Discord integration.

**Stack:** Jekyll 4.4.1, Netlify hosting, Netlify Identity (JWT auth), Giscus comments (GitHub Discussions), Discord widget integration.

## Development Commands

```bash
# Install dependencies
bundle install          # Ruby/Jekyll dependencies
npm install            # Node dependencies for Netlify Functions

# Local development
bundle exec jekyll serve    # Start dev server at http://localhost:4000
                           # Auto-rebuilds on file changes (except _config.yml)

# Build for production
bundle exec jekyll build    # Output to _site/

# Deployment
git push origin main       # Auto-deploys via Netlify
```

**Important:** After changing `_config.yml`, you must restart the Jekyll server.

## Architecture & Key Concepts

### Content Architecture

**Jekyll Collections:**
- `_posts/` - Blog posts organized by category (economics, technology, education, healthcare, policy, climate)
- `_programs/` - Custom collection for program pages (auto-routes to `/programs/:name/`)

**Page Structure:**
- **Streams** (`/streams/`) - Topic hubs aggregating posts by category with Discord integration
- **Member Area** (`/members/`) - Auth-protected pages (dashboard, directory, profile, opportunities)
- **Programs** (`/programs/`) - Static program information pages
- **Admin** (`/admin/`) - Post generation tool for moderators

### Templating System

**Layouts:**
- `default.html` - Base layout with Netlify Identity widget, SEO tags, Giscus integration
- `member.html` - Protected layout with auth verification (extends default)
- `post.html` - Blog post wrapper
- `page.html` - Generic page wrapper

**Key Includes:**
- `header.html` - Navigation with Netlify Identity integration, dropdown menus, mobile responsive
- `footer.html` - Social links, newsletter form, quick links
- `giscus.html` - GitHub Discussions commenting (repo: cu-aa-admin/cu-aa-site)
- `csrf-protection.html` - CSRF token helpers for forms and AJAX
- `auth-check.html` - Authentication utility functions
- `chat.html` - Discord widget (enabled via `chat_room:` frontmatter)

### Authentication & Security

**Netlify Identity (JWT-based):**
- Loaded via `<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>` in `default.html`
- Client-side auth check in `member.html` layout - verifies JWT on page load
- Server-side protection via `netlify.toml` redirects (role-based: "member", "admin")
- CSRF protection via serverless functions (`netlify/functions/csrf-token.js`)
- Forms use `data-csrf="true"` attribute for automatic token injection

**To protect a page:** Use `layout: member` in frontmatter

**Discord Integration:**
- Server ID: `1393296489295384726`
- Permanent invite: `https://discord.gg/buzRNDjggr`
- Widget embeds on stream pages for topic-specific channels

### Styling

**Design System** (`/assets/css/custom.css`):
- Columbia Blue: `#002E6D`, Light Blue: `#6CACE4`, Accent Red: `#EE1848`
- Font: Inter (Google Fonts)
- Responsive breakpoint: 768px
- Mobile-first approach with hamburger menu

**Note:** Many pages have inline styles in markdown - should be refactored to CSS for maintainability.

### Serverless Functions (Netlify)

Located in `netlify/functions/`:
- `submit-blog-post.js` - Handles blog submissions via email (nodemailer)
- `alumni-directory.js` - Returns filtered alumni directory data (currently mock data)
- `csrf-token.js` - Generates CSRF tokens for form protection
- `verify-auth.js` - Server-side authentication verification
- `user-stats.js` - Member statistics endpoint

**Blog Submission Workflow:**
1. User submits form → Function emails admin
2. Admin uses `/admin/` dashboard to generate formatted markdown
3. Admin creates file in `_posts/YYYY-MM-DD-slug.markdown`
4. Commit triggers Netlify rebuild

### Configuration

**`_config.yml`** controls:
- `navigation:` - Main nav with dropdown support
- `member_pages:` - Member area pages list
- `discord:` - Server ID and invite code
- `collections:` - Custom collections (`_programs/`)
- `defaults:` - Auto-applied layout assignments

**Environment Variables:**
- `.env.example` - Template for local development (copy to `.env`)
- Netlify Dashboard - Set `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_EMAIL` for production
- `netlify.toml` - Build settings (Ruby 3.3.9), redirects, role-based access control

### Alumni Directory

**Member Directory** (`/members/directory/`):
- Serverless function: `netlify/functions/alumni-directory.js`
- Currently returns mock data (50 alumni profiles)
- Features: filtering by location/industry/class year, search, modal details
- TODO: Replace with real database connection

## Key Patterns & Workflows

### Using Decap CMS (Content Management)

Access the CMS at `/admin/` to create and edit content through a web interface:
- **Posts:** Full WYSIWYG editor for blog posts with category selection
- **Programs:** Edit program pages
- **Pages:** Edit About and Home pages
- **Editorial Workflow:** Draft → Review → Publish stages

**Requirements:** Git Gateway must be enabled in Netlify Dashboard (see SETUP below).

### Creating a Blog Post (Manual)

**Frontmatter format:**
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
author: "Name (Class Year)"
categories: economics  # or: technology, education, healthcare, policy, climate
---
```

Create file: `_posts/YYYY-MM-DD-title-slug.markdown`

### Creating a Stream Page

Follow pattern in `/streams/economics.md`:
- Aggregate posts: `{% for post in site.categories.economics %}`
- Link to Discord channel
- List discussion topics

### Protecting Member Pages

Add `layout: member` to frontmatter - provides:
- Client-side JWT verification (redirects if not authenticated)
- Server-side role enforcement via Netlify redirects

### Navigation Structure

Edit `_config.yml`:
```yaml
navigation:
  - title: Menu Item
    url: /page/
  - title: Dropdown
    dropdown:
      - title: Submenu
        url: /submenu/
```

Restart Jekyll after changes.

## Important Files

**Configuration:**
- `_config.yml` - Site config, navigation, Discord settings
- `netlify.toml` - Build config, redirects, role-based access
- `Gemfile` - Ruby dependencies (Jekyll 4.4.1 + plugins)
- `.env.example` - Environment variable template

**Key Layouts:**
- `_layouts/default.html` - Base template with Netlify Identity
- `_layouts/member.html` - Protected page template with auth check

**Key Includes:**
- `_includes/header.html` - Nav with Netlify Identity integration
- `_includes/csrf-protection.html` - CSRF helpers for forms
- `_includes/giscus.html` - GitHub Discussions comments

**Serverless Functions:**
- `netlify/functions/alumni-directory.js` - Directory data API
- `netlify/functions/csrf-token.js` - CSRF token generation
- `netlify/functions/submit-blog-post.js` - Blog submission handler

## Known Limitations & TODOs

1. **Alumni directory uses mock data** - Replace `alumni-directory.js` with real database queries
2. **Newsletter form has no backend** - `/subscribe` endpoint not implemented
3. **Inline styles in markdown** - Refactor to CSS files for maintainability
4. **Google Analytics not configured** - Set `google_analytics:` in `_config.yml`
5. **Error handling minimal** - Add error states for forms and API calls
6. **Netlify CMS configured** - Decap CMS (formerly Netlify CMS) available at `/admin/` using Git Gateway

## Repository Info

- **GitHub:** cu-aa-admin/cu-aa-site
- **Main Branch:** main
- **Giscus:** Enabled (Category: "Website Discussions")
- **Discord:** https://discord.gg/buzRNDjggr

## Security

See `SECURITY.md` for complete security documentation including:
- Netlify Identity setup instructions
- CSRF protection implementation
- Environment variable configuration
- Role-based access control
- Security checklist before launch
